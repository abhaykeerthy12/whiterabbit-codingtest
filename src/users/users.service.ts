import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './entities/user.entity';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(newUser: IUser) {
    return await this.userModel.create(newUser);
  }

  async findAll() {
    return await this.userModel.find({}, 'firstName lastName email');
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  // validate given user data
  validateUser(newUser: IUser): string[] {
    let errors = [];

    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    Object.keys(newUser).forEach((key) => {
      if (!newUser[key]) {
        errors.push(`${key} is required`);
      } else if (key === 'email' && !newUser[key].match(emailRegex)) {
        errors.push(`${key} is in invalid format`);
      }
    });

    return errors;
  }
}
