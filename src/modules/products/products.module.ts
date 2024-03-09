import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, Productschema } from 'src/shared/schema/products';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Products.name, schema: Productschema }]),
  ],
  exports: [ProductsService, ProductRepository],
})
export class ProductsModule {}
