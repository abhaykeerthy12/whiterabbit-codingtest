import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  introduction: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  experience: string;

  @Prop({ required: true })
  achievements: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
