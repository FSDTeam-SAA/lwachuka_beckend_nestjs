import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Advertisement,
  AdvertisementDocument,
} from './entities/advertisement.entity';
import mongoose from 'mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
import { fileUpload } from 'src/app/helper/fileUploder';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectModel(Advertisement.name)
    private readonly advertisementModel: mongoose.Model<AdvertisementDocument>,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async createAdvertisement(
    userId: string,
    createAdvertisementDto: CreateAdvertisementDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    if (file) {
      const advertisementMedia = await fileUpload.uploadToCloudinary(file);
      if (!advertisementMedia)
        throw new HttpException('Failed to upload advertisement media', 400);
      createAdvertisementDto.uploadMedia = advertisementMedia.url;
    }
    const result = await this.advertisementModel.create({
      ...createAdvertisementDto,
      createdBy: userId,
    });
    if (!result) throw new HttpException('Failed to create advertisement', 400);
    return result;
  }
}
