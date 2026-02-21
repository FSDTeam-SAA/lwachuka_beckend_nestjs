import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;

  @Prop({ enum: ['For Sale', 'For Rent'], required: true })
  listingType: string;

  @Prop({
    enum: [
      'Apartment',
      'Studio',
      'Penthouse',
      'Duplex',
      'Condo',
      'Bungalow',
      'Cottage',
    ],
    required: true,
  })
  propertyType: string;

  @Prop({ required: true })
  bedrooms: number;

  @Prop({ required: true })
  bathrooms: number;

  @Prop({ required: true })
  area: number;

  @Prop()
  builtUp: number;

  @Prop()
  plot: number;

  @Prop()
  kitchenType: string;

  @Prop()
  parking: string;

  @Prop()
  finishes: string;

  @Prop()
  balconyType: string;

  @Prop()
  storage: string;

  @Prop()
  coolingSystem: string;

  @Prop()
  moveInStatus: string;

  @Prop()
  description: string;

  @Prop()
  propertyCommunityAmenities: string[];

  @Prop({ required: true })
  location: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  images: string[];

  @Prop()
  purpose: string;

  @Prop()
  referenceNumber: string;

  @Prop()
  furnishing: string;

  @Prop()
  addedOn: string;

  @Prop()
  originalPrice: number;

  @Prop()
  handoverDate: Date;

  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: mongoose.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  listingUser: mongoose.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  bookmarkUser: mongoose.Types.ObjectId[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
