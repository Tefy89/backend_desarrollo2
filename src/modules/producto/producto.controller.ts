import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) { }

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get('back')
  async backend(@Req() req: Request) {
    const builder = await this.productoService.queryBuilder('productos');

    if (req.query.q) {
      builder.where("productos.nombre LIKE :q", { q: `%${req.query.q}%` });
    }

    const sort: any = req.query.sort;
    if (sort) {
      builder.orderBy('productos.precio', sort.toUpperCase());
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const limit = 2;

    builder.offset((page - 1) * limit).limit(limit);

    const [data, total] = await builder.getManyAndCount(); // Obtener datos y total de registros

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit)
    };
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
