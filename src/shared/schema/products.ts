import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum Access {
  PRIVATE = "private",
  PUBLIC = "public"
}

@Schema(
  {
    timestamps: true,
  }
)
export class Products {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  title: string;

  // Unit price of the product
  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: [Access.PRIVATE, Access.PUBLIC], default: Access.PRIVATE })
  access: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  stock: number;
}

export type ProductsDocument = Products & HydratedDocument<Products>;

export const Productschema = SchemaFactory.createForClass(Products);
