import { HttpException, Injectable } from '@nestjs/common';
import { CreateContactpropretyDto } from './dto/create-contactproprety.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ContactProperty,
  ContactPropertyDocument,
} from './entities/contactproprety.entity';
import { Model } from 'mongoose';
import {
  Property,
  PropertyDocument,
} from '../property/entities/property.entity';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class ContactpropretyService {
  constructor(
    @InjectModel(ContactProperty.name)
    private contactPropertyModel: Model<ContactPropertyDocument>,

    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createContactProperty(
    userId: string,
    createContactpropretyDto: CreateContactpropretyDto,
    propertyId: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const property = await this.propertyModel.findById(propertyId);
    if (!property) {
      throw new HttpException('Property not found', 404);
    }
    const result = await this.contactPropertyModel.create({
      ...createContactpropretyDto,
      userId: user._id,
      propertyId: property._id,
    });

    return result;
  }


  
}
