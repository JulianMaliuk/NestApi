import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
const bcrypt = require('bcrypt')

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
  roles: [String];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next: Function) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

UserSchema.methods.comparePasswords = async function (submittedPassword): Promise<boolean> {
  const user = this;
  return bcrypt.compare(submittedPassword, user.password);
};

export { UserSchema };
