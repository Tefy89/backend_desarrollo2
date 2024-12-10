import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre_completo:string;

    @Column()
    dni: string;

    @Column()
    telefono:string;
}
