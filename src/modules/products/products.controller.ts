import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { AdminAccess } from '../auth/decorators/admin-decorator';
import { PublicAccess } from '../auth/decorators/public-decorator';
import { PaginationQueryParamsDto } from 'src/shared/dto/pagination-query-params.dto';

@Controller('products')
@ApiTags('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiBearerAuth()
  @AdminAccess()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('/public')
  @PublicAccess()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findPublic(@Query() paginationQueryParams: PaginationQueryParamsDto) {
    return this.productsService.find({ access: 'public' }, paginationQueryParams.page, paginationQueryParams.limit);
  }

  @Get()
  @ApiBearerAuth()
  @AdminAccess()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query() paginationQueryParams: PaginationQueryParamsDto) {
    console.log('AAAAAAAAAAAAAAAAAA');

    return this.productsService.findAll(paginationQueryParams.page, paginationQueryParams.limit);
  }

  @Get(':id')
  @PublicAccess()
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @AdminAccess()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }


  @Patch('/update/all')
  @ApiBearerAuth()
  @AdminAccess()
  updateAll(@Body() updateProduct: UpdateProductDto) {
    return this.productsService.updateAll(updateProduct);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @AdminAccess()
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
