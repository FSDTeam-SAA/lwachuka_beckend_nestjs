import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'src/app/config';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  profileImage: string;

  @Prop({
    enum: ['user', 'agent', 'seller', 'vendor', 'admin'],
    default: 'user',
  })
  role: string;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  bio: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop()
  postCode: string;

  @Prop()
  otp?: string;

  @Prop()
  otpExpiry?: Date;

  @Prop()
  verifiedForget: boolean;

  @Prop()
  stripeAccountId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  );
});
