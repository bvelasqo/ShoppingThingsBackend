import { InjectModel } from "@nestjs/mongoose";
import { Products, ProductsDocument } from "../schema/products";
import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginatedDto } from "../dto/paginated.dto";

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(Products.name) private readonly productModel: Model<Products>) { }

  async findOne(query: any) {
    return await this.productModel.findOne(query)
  }

  async create(data: Record<string, any>) {
    return await this.productModel.create(data)
  }

  async findAll(page: number, limit: number): Promise<PaginatedDto<Products>> {
    const products = await this.productModel.find().limit(limit).skip((page - 1) * limit).exec();
    const itemCount = await this.productModel.countDocuments();
    return new PaginatedDto<Products>(products.map(this.convert), page, limit, itemCount)
  }

  async find(query: any, page: number, limit: number): Promise<PaginatedDto<Products>> {
    const products = await this.productModel.find(query).limit(limit).skip((page - 1) * limit).exec();
    const itemCount = await this.productModel.countDocuments(query);
    return new PaginatedDto<Products>(products.map(this.convert), page, limit, itemCount)
  }

  async updateOne(query: any, data: any) {
    return await this.productModel.updateOne(query, data)
  }

  async deleteOne(query: any) {
    return await this.productModel.deleteOne(query)
  }

  async update(id: string, data: any) {
    try {
      const currentProduct = await this.productModel.findOne({ _id: id });
      if (!currentProduct) {
        throw new Error('Product not found');
      }
      // Update only the fields that are present in the data object and are not undefined
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          currentProduct[key] = data[key];
        }
      });
      // Save the updated product to the database
      const updatedProduct = await currentProduct.save();
      return updatedProduct;
    } catch (error) {
      throw new HttpException(`Error updating product: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAll(data: any) {
    try {
      await this.productModel.updateMany({}, data);
      return data;
    } catch (error) {
      throw new HttpException(`Error updating products: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  private convert(cat: ProductsDocument): Products {
    const json = cat.toObject({ versionKey: false });
    return {
      ...json,
    };
  }
}
