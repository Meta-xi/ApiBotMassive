import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Massive_Forward } from './entities/massive_forward.entity';
import { Repository } from 'typeorm';
import { InstanceWhatsapp } from 'src/instance_whatsapp/entities/instance_whatsapp.entity';
import * as fs from 'fs';
import { Create_Massive_Forward } from './dto/massive_forward.dto';
import * as path from 'path';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/User/user.entity';
import { QueueListService, QueueSendMessage } from './Queue/Queue';

@Injectable()
export class MassiveForwardService {
    constructor(
        @InjectRepository(Massive_Forward)
        private masive_forward_repository: Repository<Massive_Forward>,
        @InjectRepository(InstanceWhatsapp)
        private instance_whatsapp_repository: Repository<InstanceWhatsapp>,
        @InjectRepository(User)
        private user_repository: Repository<User>,
        private queueList : QueueListService,
        private queueMessage : QueueSendMessage
    ) {}

    // Obtener grupos de una instancia
    async getGrups(instanceName: string) {
        const entity = await this.instance_whatsapp_repository.findOne({
            where: { instanceName }
        });
        if (!entity) throw new NotFoundException(`La instancia ${instanceName} no está registrada`);

        const url = `https://evolution-api-production-22e8.up.railway.app/instance/connectionState/${instanceName}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'apikey': 'PingaPalComunismo', 'Content-Type': 'application/json' }
        });
        if (response.status !== 200) throw new NotFoundException(`La instancia ${instanceName} no está registrada`);

        const data = await response.json();
        if (data.instance.state !== 'open')
            throw new BadRequestException(`La instancia ${instanceName} no está conectada, por favor conecte la instancia`);

        const urlGroups = `https://evolution-api-production-22e8.up.railway.app/group/fetchAllGroups/${instanceName}?getParticipants=false`;
        const respGroups = await fetch(urlGroups, {
            method: 'GET',
            headers: { 'apikey': 'PingaPalComunismo', 'Content-Type': 'application/json' }
        });
        return await respGroups.json();
    }

    // Enviar media a WhatsApp
    async sendMediaToWhatsapp(groupId: string, instanceName: string, urlImage: string, caption: string) {
        Logger.log('Enviando Mensaje con archivo multimedia');
        Logger.log(`https://apibotmassive-production.up.railway.app/public/${urlImage}`)
        const response = await fetch(`https://evolution-api-production-22e8.up.railway.app/message/sendMedia/${instanceName}`, {
            method: 'POST',
            headers: { 'apikey': 'PingaPalComunismo', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number: groupId,
                mediatype: 'image',
                mimetype: 'image/jpeg',
                caption,
                media: `https://apibotmassive-production.up.railway.app/public/${urlImage}`,
                fileName: '',
                delay: 3000
            })
        });

        if (response.status !== 201) {
            const errorBody = await response.text();
            Logger.error(`Error enviando al grupo ${groupId}: ${errorBody}`);
            return;
        }
        Logger.log("Mensaje enviado");
    }
    async SendMessageWhatsapp(groupId : string , instanceName : string , text : string) {
        Logger.log("Enviando Mensajes de texto");
        const url = `https://evolution-api-production-22e8.up.railway.app/message/sendText/${instanceName}`;
        const response = await fetch(url , {
            method : 'POST',
            headers: { 'apikey': 'PingaPalComunismo', 'Content-Type': 'application/json' },
            body : JSON.stringify({
                number: groupId,
                text: text,
                delay: 3000
            })
        });
        if(response.status !== 201){
            Logger.error(response.json());
            return;
        }
        Logger.log("Mensaje enviado");
    }
    // Crear configuración de Massive Forward
    async createConfig(createConfig: Create_Massive_Forward, imagen?: Express.Multer.File) {
        const user = await this.user_repository.findOne({ where: { idUserTelegram: createConfig.chat_id } });
        if (!user) throw new NotFoundException('Usuario no registrado');

        const instance = await this.instance_whatsapp_repository.findOne({ where: { userIdTelegram: user.idUserTelegram } });
        if (!instance) throw new NotFoundException('No tiene una instancia creada');

        const url = `https://evolution-api-production-22e8.up.railway.app/instance/connectionState/${instance.instanceName}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'apikey': 'PingaPalComunismo', 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.instance.state !== 'open')
            throw new BadRequestException(`La instancia ${instance.instanceName} no está conectada`);

        // Guardar imagen si existe
        let imagePath: string | null = null;
        if (imagen) {
            const targetFolder = path.join(process.cwd(), 'public', 'assets');
            if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });

            const fileName = `${Date.now()}-${imagen.originalname}`;
            fs.writeFileSync(path.join(targetFolder, fileName), imagen.buffer);
            imagePath = `assets/${fileName}`; // <-- importante, no incluir /public
        }

        const destinos = Array.isArray(createConfig.ids_destino)
            ? createConfig.ids_destino
            : [createConfig.ids_destino];

        const newConfig = this.masive_forward_repository.create({
            interval: createConfig.intervalo,
            ids_destino: destinos,
            enabled: true,
            createdAt: new Date(),
            caption: createConfig.caption,
            url: imagePath,
            user
        });

        await this.masive_forward_repository.save(newConfig);
    }

    // Cron que revisa qué configs enviar
    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const configs = await this.masive_forward_repository.find({ relations: ['user'] });
        const now = new Date().getTime();

        const backList = configs.filter(cfg => {
            const createdAtTime = new Date(cfg.createdAt).getTime();
            const diffMin = (now - createdAtTime) / (1000 * 60);
            return diffMin >= cfg.interval && cfg.enabled;
        });
        if(backList.length === 0) return ;
        this.queueList.enqueue(backList);
        Logger.log(this.queueList);
        const updatePromises = backList.map(cfg => {
            cfg.createdAt = new Date();
            return this.masive_forward_repository.save(cfg);
        })
        await Promise.all(updatePromises);
    }
    @Cron(CronExpression.EVERY_30_SECONDS)
    async TransferConfigsToQueueMessage(){
        if(!this.queueMessage.isEmpty()){
            return;
        }
        if(this.queueList.isEmpty()){
            return;
        }
        const GetOldQueueList = this.queueList.dequeue();
        if(GetOldQueueList === undefined){
            return;
        }
        for(var i of GetOldQueueList.list){
            this.queueMessage.enqueue(i);
        }
        this.queueMessage.setEnabled(true);
    }
    @Cron(CronExpression.EVERY_MINUTE)
    async SendMassiveMessage(){
        if(!this.queueMessage.getEnabled()){
            return;
        }
        Logger.log("Comenzando proceso de envio de mensajes");
        while(!this.queueMessage.isEmpty()){
            const config = this.queueMessage.dequeue();
            if(config !== undefined){
                var idsToSend = config.ids_destino;
                if(!Array.isArray(idsToSend)){
                    idsToSend = [idsToSend];
                }
                idsToSend = idsToSend.map(group => group.split(',')).flat();
                const idGroup = idsToSend.shift();
                config.ids_destino = idsToSend.length > 0 ?[idsToSend.join(',')] : [];
                Logger.log(idGroup);
                if(idGroup !== undefined){
                    const user = await this.user_repository.findOne({
                        where: {idUserTelegram: config.user.idUserTelegram},
                        relations : ['InstanceWhatsapp']
                    })
                    if(user && user.InstanceWhatsapp){
                        const textForWhatsapp = config.caption.replace(/\\n/g, '\n');
                        if(!config.url){
                            await this.SendMessageWhatsapp(idGroup , user.InstanceWhatsapp.instanceName , textForWhatsapp);
                        }
                        else{
                            await this.sendMediaToWhatsapp(idGroup ,user.InstanceWhatsapp.instanceName ,config.url , textForWhatsapp)
                        }
                    }
                    
                }
                if(config.ids_destino.length > 0){
                    this.queueMessage.enqueue(config);
                }
            }
        }
        this.queueMessage.setEnabled(false);
    }
   
    
}
