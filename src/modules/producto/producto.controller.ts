import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Res,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(JwtAuthGuard) //con esto ya no podemos acceder a los productos
@ApiBearerAuth() //esto es solo para swagger
@ApiTags('producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

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
    const builder = await this.productoService
      .queryBuilder('productos')
      .leftJoinAndSelect('productos.categoria', 'categoria'); //para devolver la informacion
    if (req.query.q) {
      //si existe el valor de búsqueda
      builder.where('productos.nombre LIKE :q', { q: `%${req.query.q}%` });
    }

    const sort: any = req.query.sort;
    if (sort) {
      builder.orderBy('productos.precio', sort.toUpperCase());
    }

    const page: number = parseInt(req.query.page as any) || 1; //si no existe nada captura la pagina 1

    //const limit=10; //limite de productos por pagina
    const limit = parseInt(req.query.limit as any) || 10; //para controlar el limite

    builder.offset((page - 1) * limit).limit(limit); //a partir de que dato vamos a mostrar la informacion
    //si page es 1 entonces a partir de 0 me muestra 10

    const total = await builder.getCount();

    return {
      data: await builder.getMany(),
      total: total,
      page: page,
      last_page: Math.ceil(total / limit),
    };
    //return await builder.getMany()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }

  @Post(':id/actualizar-img')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        //donde quiero guardar
        destination: './files', //quiero guardar en la carpeta files, que estara en la raiz del proyecto
        filename: (req, file, callback) => {
          //nombre para el archivo
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 9); //fecha concatenada con un numero aleatorio
          const ext = extname(file.originalname); //capturamos la extension del archivo
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`; //nombre final del archivo
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param() params,
  ) {
    console.log(file);

    return this.productoService.uploadImagen(file, params.id);
  }

  @Get('file/:img')
  getArchivoFile(@Param('img') imagen, @Res() res) {
    return res.sendFile(imagen, { root: 'files' });
  }
}
