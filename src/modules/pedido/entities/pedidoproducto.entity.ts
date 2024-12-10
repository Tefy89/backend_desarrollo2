import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Producto } from "../../producto/entities/producto.entity";

@Entity('pedido_producto')
export class PedidoProducto{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    public pedidoId: number;

    @Column()
    public productoId: number;
    
    @Column()
    public cantidad: number;
    
    @ManyToOne(()=>Pedido,(ped)=>ped.pedidoProductos)
    public pedido:Pedido

    @ManyToOne(()=>Producto,(pro)=>pro.pedidoProductos)
    public producto:Producto
    
}