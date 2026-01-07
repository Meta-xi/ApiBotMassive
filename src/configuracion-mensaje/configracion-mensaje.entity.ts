import { User } from "src/User/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConfiguracionMensaje {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => User , user => user.configuracion , {onDelete: 'CASCADE'})
    user: User;
    @Column({type: 'json'})
    mensaje: any;
    @Column({type: 'json'})
    ids_destino: string[];
    @Column({type: 'int'})
    intervalo: number;
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({type: 'boolean' , default :true})
    enabled: boolean;
}