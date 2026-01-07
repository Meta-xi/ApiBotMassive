import { User } from "src/User/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class InstanceWhatsapp {
    @PrimaryColumn('uuid')
    instanceId : string;
    @Column()
    instanceName : string;
    @OneToOne(()=> User ,user => user.InstanceWhatsapp)
    @JoinColumn({name: 'user_id'})
    user: User;
    @Column({nullable: true})
    phoneNumber : string;
    @Column('bigint')
    userIdTelegram : number;
}
