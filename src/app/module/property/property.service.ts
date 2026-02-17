import { HttpException, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { fileUpload } from 'src/app/helper/fileUploder';
import { getLatLngFromAddress } from 'src/app/helper/geocode';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertyModel: mongoose.Model<Property>,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async createProperty(
    userId: string,
    createPropertyDto: CreatePropertyDto,
    files?: Express.Multer.File[],
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    let propertyImages: string[] = [];

    if (files?.length) {
      const uploads = await Promise.all(
        files.map((file) => fileUpload.uploadToCloudinary(file)),
      );

      propertyImages = uploads.map((img) => img.url);
    }

    const fullAddress = `${createPropertyDto.location || ''}`;

    let lat: number | null = null;
    let lng: number | null = null;

    if (fullAddress.trim()) {
      const coords = await getLatLngFromAddress(fullAddress);
      lat = coords.lat;
      lng = coords.lng;
    }

    const property = await this.propertyModel.create({
      ...createPropertyDto,
      images: propertyImages,
      createBy: user._id,
      lat: lat ?? undefined,
      lng: lng ?? undefined,
    });

    return property;
  }
}
