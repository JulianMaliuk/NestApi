import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({versionKey: false})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  name: string;

  @Prop({select: false})
  password: string;

  @Prop({ type: [String], enum: ['user', 'admin'], default: ['user'] })
  roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
