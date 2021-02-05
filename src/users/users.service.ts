import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel(createUserDto);
    return created.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  /**
   * For auth
   */
  async findOneWithPassword(username: string): Promise<User> {
    return this.userModel.findOne({username}).select('+password').exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id)
  }
}
