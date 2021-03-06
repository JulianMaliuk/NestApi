import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto)
    return this.userModel.findById(user.id).lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(data: Object): Promise<User> {
    return this.userModel.findOne(data).exec();
  }

  async findOneWithPassword(data: Object): Promise<User> {
    return this.userModel
      .findOne(data)
      .select('+password')
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id)
  }
}
