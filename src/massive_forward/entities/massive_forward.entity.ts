import { User } from "src/User/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Massive_Forward{
    @PrimaryGeneratedColumn('uuid')
    id : string;
    @ManyToOne(() => User , user => user.massive , {onDelete : 'CASCADE'})
    user : User;
    @Column()
    caption: string
    @Column({type: 'text' , nullable : true})
    url : string | null 
    @Column({type: 'json'})
    ids_destino : string [];
    @Column()
    interval : number;
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({type: 'boolean' , default :true})
    enabled: boolean;
}