import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductRepository } from 'src/shared/repositories/product.repository';

@Injectable()
export class ProductsService {

  constructor(
    @Inject(ProductRepository) private readonly ProductRepository: ProductRepository
  ) { }

  async create(createProductDto: CreateProductDto) {
    const product = await this.ProductRepository.create(createProductDto)
    return {
      success: true,
      message: 'Product created successfully',
      result: product
    }
  }

  async findAll(page: number, limit: number) {
    const products = await this.ProductRepository.findAll(page, limit)
    return {
      success: true,
      message: 'Products found',
      result: products
    }
  }

  async find(query: any, page: number, limit: number) {
    const products = await this.ProductRepository.find(query, page, limit)
    return {
      success: true,
      message: 'Products found',
      result: products
    }
  }

  async findOne(id: string) {
    const product = await this.ProductRepository.findOne({ _id: id })
    return {
      success: true,
      message: 'Product found',
      result: product
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.ProductRepository.update(id, updateProductDto)
    return {
      success: true,
      message: 'Product updated successfully',
      result: updatedProduct
    }
  }

  async updateAll(updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.ProductRepository.updateAll(updateProductDto)
    return {
      success: true,
      message: 'Products updated successfully',
      result: updatedProduct
    }
  }

  async remove(id: string) {
    const deletedProduct = await this.ProductRepository.deleteOne({ _id: id })
    return {
      success: true,
      message: 'Product deleted successfully',
      result: deletedProduct
    }
  }
}
