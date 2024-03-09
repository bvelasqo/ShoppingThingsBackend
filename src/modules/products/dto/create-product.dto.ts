import { ApiProperty } from '@nestjs/swagger';
import { Access } from 'src/shared/schema/products';
import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: 'Title of the product',
    type: String,
    example: 'Product 1'
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    description: 'Price of the product',
    type: Number,
    example: 100
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @ApiProperty({
    description: 'Description of the product',
    type: String,
    example: 'Description of product 1'
  })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Access of the product',
    type: String,
    example: 'public',
    enum: [Access.PRIVATE, Access.PUBLIC]
  })
  @IsNotEmpty()
  @IsString()
  @IsIn([Access.PRIVATE, Access.PUBLIC])
  access: string;
  @ApiProperty({
    description: 'Image of the product',
    type: String,
    example: 'image.jpg'
  })
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Country of the product',
    type: String,
    example: 'India'
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Stock of the product',
    type: Number,
    example: 100
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
