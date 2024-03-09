import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum Role {
  ADMIN = "admin",
  OWNER = "owner",
  USER = "user"
}



@Schema(
  {
    timestamps: true,
  }
)
export class Users {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true , enum: [Role.ADMIN, Role.OWNER, Role.USER], default: Role.USER })
  role: string;

  @Prop({ required: true })
  status: string;
}

export type UsersDocument = Users & HydratedDocument<Users>;

export const UserSchema = SchemaFactory.createForClass(Users);
