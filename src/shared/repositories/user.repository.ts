import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "../schema/users";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { PaginatedDto } from "../dto/paginated.dto";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }
  
  async findOne(query: any) {
    return await this.userModel.findOne(query)
  }

  async create(data: Record<string, any>) {
    return await this.userModel.create(data)
  }

  async find(page: number, limit: number): Promise<PaginatedDto<Users>> {
    const users = await this.userModel.find().limit(limit).skip((page - 1) * limit).exec();
    const itemCount = await this.userModel.countDocuments();
    return new PaginatedDto<Users>(users.map(this.convert), page, limit, itemCount)
  }

  async findById(id: string) {
    return await this.userModel.findById(id)
  }

  async delete(query: any) {
    return await this.userModel.deleteOne(query)
  }

  
  private convert(cat: UsersDocument): Users {
    const json = cat.toObject({ versionKey: false });
    const id = json._id;
    delete json._id;
    return {
      ...json,
      id: String(id),
    };
  }
}
