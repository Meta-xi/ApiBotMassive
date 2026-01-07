import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { ConfiguracionMensaje } from 'src/configuracion-mensaje/configracion-mensaje.entity';
import { InstanceWhatsapp } from 'src/instance_whatsapp/entities/instance_whatsapp.entity';
import { Massive_Forward } from 'src/massive_forward/entities/massive_forward.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'bigint', unique: true})
    idUserTelegram: number;
    @Column({type: 'varchar', unique: false})
    sesionToken: string;
    @OneToMany(() => ConfiguracionMensaje , configuracion => configuracion.user)
    configuracion: ConfiguracionMensaje[];
    @OneToOne(() => InstanceWhatsapp , instance => instance.user)
    InstanceWhatsapp: InstanceWhatsapp;
    @OneToMany(()=> Massive_Forward , massive_forward => massive_forward.user)
    massive : Massive_Forward[];
}