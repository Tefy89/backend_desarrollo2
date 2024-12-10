import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    detalle:string;

    @ManyToMany(()=>User)
    @JoinTable({name:'rol_user'}) //con esto ya se crea la tercera tabla
    users:User[]
}