import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInstanceWhatsappDto } from './dto/create-instance_whatsapp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstanceWhatsapp } from './entities/instance_whatsapp.entity';
import {  Repository } from 'typeorm';
import { User } from 'src/User/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class InstanceWhatsappService {
  constructor(
    @InjectRepository(InstanceWhatsapp)
    private instanceWhatsapp: Repository<InstanceWhatsapp>,
    @InjectRepository(User)
    private user: Repository<User>
  ) { }

  async create(createInstanceWhatsappDto: CreateInstanceWhatsappDto) {
    var if_exist = await this.user.findOne({ where: { idUserTelegram: createInstanceWhatsappDto.UserTelegramId } });
    if (!if_exist) {
      return null;
    }
    console.log(if_exist);
    var if_name_exist = await this.instanceWhatsapp.findOne({ where: { instanceName: createInstanceWhatsappDto.InstanceName } });
    if (if_name_exist) {
      return null;
    }
    let url = 'https://evolution-api-production-22e8.up.railway.app/instance/create';
    const token = randomUUID();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': 'PingaPalComunismo',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'instanceName': createInstanceWhatsappDto.InstanceName,
        'token': token,
        'integration': 'WHATSAPP-BAILEYS'
      })
    });
    console.log(response.status)
    if (response.status !== 201) {
      return null;
    }
    console.log(if_name_exist);
    const data = await response.json();
    const instance = data.instance;
    const instanceName = instance.instanceName;
    url = `https://evolution-api-production-22e8.up.railway.app/instance/connect/${instanceName}`;
    const getQr = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': 'PingaPalComunismo',
        'Content-Type': 'application/json'
      },
    });
    if (!getQr) {
      return null;
    }
    const qrjson = await getQr.json();
    url = `https://evolution-api-production-22e8.up.railway.app/webhook/set/${instanceName}`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': 'PingaPalComunismo',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "webhook": {
          "enabled": true,
          "url": `https://evolution-api-production-22e8.up.railway.app/instance-whatsapp/${instanceName}`,
          "webhookByEvents": false,
          "webhookBase64": false,
          "events": [
            "CONNECTION_UPDATE"
          ]
        }
      })
      
    });
    
    const newInstance = this.instanceWhatsapp.create({
      instanceId: instance.instanceId,
      instanceName: instanceName,
      phoneNumber: "",
      userIdTelegram: createInstanceWhatsappDto.UserTelegramId,
      user: if_exist
    });
    await this.instanceWhatsapp.save(newInstance);    
    return qrjson;
  }

  async updateStatus(instanceName: string) {
    let url = `https://evolution-api-production-22e8.up.railway.app/instance/connectionState/${instanceName}`;
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'apikey': 'PingaPalComunismo',
            'Content-Type': 'application/json'
        },
    });
    if (response.status !== 200) {
        console.log("Hubo un error al buscar el status de la instancia :" + instanceName);
        return;
    }
    let data = await response.json();
    if (data.instance.state !== "open") {
        console.log("La instancia " + instanceName + " está en estado " + data.instance.state);
        return;
    }
    url = 'https://evolution-api-production-22e8.up.railway.app/instance/fetchInstances';
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'apikey': 'PingaPalComunismo',
            'Content-Type': 'application/json'
        },
    });
    data = await response.json();
    console.log(data);
    const findInstance = await data.find(obj => obj.name === instanceName);
    console.log(findInstance);
    if (!findInstance) {
        console.log("La instancia no se encuentra dentro de los objetos de fetchInstances");
        return;
    }
    var databaseInstance = await this.instanceWhatsapp.findOne({ where: { instanceName: instanceName } });
    if (!databaseInstance) {
        console.log("La instancia " + instanceName + " no está registrada en la base de datos ");
        return;
    }
    const owner = findInstance.ownerJid;
    console.log(owner);
    const phoneNumber = owner ? owner.split('@')[0] : null;
    databaseInstance.phoneNumber = phoneNumber;
    await this.instanceWhatsapp.save(databaseInstance);
    url = `https://evolution-api-production-22e8.up.railway.app/webhook/set/${instanceName}`;
    await fetch(url, {
        method: 'POST',
        headers: {
            'apikey': 'PingaPalComunismo',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "webhook": {
                "enabled": false,
                "url": `https://evolution-api-production-22e8.up.railway.app/instance-whatsapp/${instanceName}`,
                "webhookByEvents": false,
                "webhookBase64": false,
                "events": [
                    "CONNECTION_UPDATE"
                ]
            }
        })
    });
}
async logoutInstance(instanceName: string){
  var instance = await this.instanceWhatsapp.findOne({
    where: {instanceName : instanceName}
  });
  
  if(!instance){
    return "La instancia no esta registrada en la aplicacion ";
  }
  var url = `https://evolution-api-production-22e8.up.railway.app/instance/connectionState/${instanceName}`;
  var response = await fetch(url ,{
    method: 'GET',
    headers: {
      'apikey': 'PingaPalComunismo',
      'Content-Type': 'application/json'
  },
  });
  if(response.status !== 200){
    return response;
  }
  var data = await response.json();
  if(data.instance.state !== 'open'){
    throw new NotFoundException("La instancia " + instanceName + " no esta conectada");
  }
  url = `https://evolution-api-production-22e8.up.railway.app/instance/logout/${instanceName}`;
  response = await fetch(url , {
    method: 'DELETE',
    headers: {
      'apikey': 'PingaPalComunismo',
      'Content-Type': 'application/json'
  },
  });
  if(response.status !== 200){
    throw new NotFoundException("La instancia "+instanceName+" no se encontró a la hora de desloguear");
  }
  return "Cerró exitosamente la instancia ";
}
async connectInstance(instanceName: string){
  var instance = await this.instanceWhatsapp.findOne({
    where: {instanceName: instanceName}
  });
  if(!instance){
    throw new NotFoundException("La instancia "+instanceName+" no esta registrada en la aplicacion");
  }
  var url = `https://evolution-api-production-22e8.up.railway.app/instance/connectionState/${instanceName}`;
  var response = await fetch(url , {
    method: 'GET',
    headers: {
      'apikey': 'PingaPalComunismo',
      'Content-Type': 'application/json'
    },
  });
  if(response.status !== 200){
    throw new NotFoundException("La instancia "+instanceName+" no esta registrada en la aplicacion");
  }
  var data = await response.json();
  if(data.instance.state === "open"){
    throw new NotFoundException("La instancia "+instanceName+" ya esta conectada");
  }
  url = `https://evolution-api-production-22e8.up.railway.app/instance/connect/${instanceName}`;
  response = await fetch(url ,{
    method: 'GET',
    headers: {
      'apikey': 'PingaPalComunismo',
      'Content-Type': 'application/json'
    },
  });
  const res = await response.json();
  return res;
}
  async delete_instance(instanceName : string){
    const entity = await this.instanceWhatsapp.findOne({
      where: {
        instanceName: instanceName
      }
    })
    if(!entity){
      throw new NotFoundException("La instancia "+instanceName+" no esta registrada");
    }
    await this.instanceWhatsapp.remove(entity);
    var url = `https://evolution-api-production-22e8.up.railway.app/instance/delete/${instanceName}`;
    var response = await fetch(url ,{
      method: 'DELETE',
      headers: {
        'apikey': 'PingaPalComunismo',
        'Content-Type': 'application/json'
      },
    });
    if(response.status !== 200){
      throw new NotFoundException("La instancia "+instanceName+" no está registrada");
    }
    const data = await response.json();
    return data;
  }
  findAll() {
    return `This action returns all instanceWhatsapp`;
  }

  async findInstanceByIdUserTelegram(idUserTelegram: number) {
    const instance = await this.instanceWhatsapp.findOne({where: {userIdTelegram : idUserTelegram}});
    if(!instance){
      throw new NotFoundException("La instancia no se encuentra registrada ");
    }
    return instance.instanceName;
  }

  remove(id: number) {
    return `This action removes a #${id} instanceWhatsapp`;
  }
}
