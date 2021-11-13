import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { IUser } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // render add user form page
  @Get('add')
  @Render('users/add')
  renderAddPage() {
    return {};
  }

  // validate and save user
  @Post('add')
  async create(@Body() newUser: IUser, @Res() res: Response) {
    try {
      // validate user
      let errors = this.usersService.validateUser(newUser);

      // if errors, show form page with errors
      if (errors.length) {
        return res.render('users/add', {
          errors,
        });
      }

      // save user to db
      await this.usersService.create(newUser);

      // return add page on success
      return res.render('users/add', { successMessage: 'Added new User!!!' });
    } catch (error) {
      // on error, render form with error
      return res.render('users/add', {
        errors:
          error.code === 11000
            ? ['Email already exists']
            : ['Something went wrong'],
      });
    }
  }

  // return all users
  @Get()
  @Render('users')
  async findAll() {
    try {
      const users = await this.usersService.findAll();

      return { users };
    } catch (error) {
      return { users: [] };
    }
  }

  // return user based on id
  @Get(':id')
  @Render('users/details')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);

      return { user };
    } catch (error) {
      return { user: null };
    }
  }
}
