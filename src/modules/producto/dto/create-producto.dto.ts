import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  precio: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsInt()
  @IsNotEmpty()
  categoriaId: number;
}
