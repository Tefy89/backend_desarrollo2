import { Producto } from "../../producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    nombre: string;

    @Column({type: 'text', nullable: true})
    detalle: string;

    @OneToMany(()=>Producto, (prod)=>prod.categoria)
    producto:Producto[]
}
