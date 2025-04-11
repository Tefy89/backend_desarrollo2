import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  queryBuilder(alias: string) {
    return this.productoRepository.createQueryBuilder(alias);
  }

  create(createProductoDto: CreateProductoDto) {
    return this.productoRepository.save(createProductoDto);
  }

  findAll() {
    return this.productoRepository.find();
  }

  findOne(id: number) {
    return this.productoRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.productoRepository.update(id, updateProductoDto);
  }

  remove(id: number) {
    return this.productoRepository.delete(id);
  }

  async uploadImagen(file: Express.Multer.File, id: string) {
    const producto = await this.productoRepository.findOne({
      where: { id: +id },
    });
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    producto.image = file.filename;
    await this.productoRepository.save(producto);
    return {
      mensaje: 'Imagen subida correctamente',
      producto,
    };
  }
}
