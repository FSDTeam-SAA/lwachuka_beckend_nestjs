import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreateAdvertisementDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  advertisementType: string;

  @IsUrl()
  @IsNotEmpty()
  callToActionURL: string;

  @IsString()
  @IsNotEmpty()
  uploadMedia: string;

  @IsArray()
  @IsString({ each: true })
  targetRegions: string[];

  @IsArray()
  @IsString({ each: true })
  targetAudience: string[];

  @IsNumber()
  campaignBudget: number;

  @IsString()
  campaignDuration: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
