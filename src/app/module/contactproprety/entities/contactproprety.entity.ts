import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContactPropertyDocument = ContactProperty & Document;

@Schema({ timestamps: true })
export class ContactProperty {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId?: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;

  @Prop({ enum: ['pending', 'viewed', 'responded'], default: 'pending' })
  status: string;
}

export const ContactPropertySchema =
  SchemaFactory.createForClass(ContactProperty);
