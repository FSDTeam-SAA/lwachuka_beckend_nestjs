import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subscriber' })
  subscriber: mongoose.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop()
  stripeSessionId: string;

  @Prop()
  stripePaymentIntentId: string;

  @Prop()
  paymentType: string;

  @Prop({ default: 'usd' })
  currency: string;

  @Prop({
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
