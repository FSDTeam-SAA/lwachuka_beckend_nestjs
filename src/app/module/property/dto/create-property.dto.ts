import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsEnum(['For Sale', 'For Rent'])
  listingType: string;

  @IsEnum([
    'Apartment',
    'Studio',
    'Penthouse',
    'Duplex',
    'Condo',
    'Bungalow',
    'Cottage',
  ])
  propertyType: string;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsNumber()
  area: number;

  @IsOptional()
  @IsNumber()
  builtUp?: number;

  @IsOptional()
  @IsNumber()
  plot?: number;

  @IsOptional()
  @IsString()
  kitchenType?: string;

  @IsOptional()
  @IsString()
  parking?: string;

  @IsOptional()
  @IsString()
  finishes?: string;

  @IsOptional()
  @IsString()
  balconyType?: string;

  @IsOptional()
  @IsString()
  storage?: string;

  @IsOptional()
  @IsString()
  coolingSystem?: string;

  @IsOptional()
  @IsString()
  moveInStatus?: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  propertyCommunityAmenities?: string[];

  @IsString()
  location: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  purpose?: string;

  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @IsOptional()
  @IsString()
  furnishing?: string;

  @IsOptional()
  @IsString()
  addedOn?: string;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsOptional()
  @IsDateString()
  handoverDate?: Date;

  @IsOptional()
  @IsArray()
  bookmarkUser?: string[];
}
