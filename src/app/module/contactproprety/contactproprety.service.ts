import { HttpException, Injectable } from '@nestjs/common';
import { CreateContactpropretyDto } from './dto/create-contactproprety.dto';

import { InjectModel } from '@nestjs/mongoose';
import {
  ContactProperty,
  ContactPropertyDocument,
} from './entities/contactproprety.entity';
import { Model, Types } from 'mongoose';
import {
  Property,
  PropertyDocument,
} from '../property/entities/property.entity';
import { User, UserDocument } from '../user/entities/user.entity';
import { SendMessageDto } from './dto/send-message.dto';

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

  // User first contact
  async createContactProperty(
    userId: string,
    dto: CreateContactpropretyDto,
    propertyId: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    const property = await this.propertyModel.findById(propertyId);
    if (!property) throw new HttpException('Property not found', 404);

    const contact = await this.contactPropertyModel.create({
      userId: user._id,
      propertyId: property._id,
      propertyOwnerId: dto.propertyOwnerId,
      messages: [
        {
          senderId: user._id,
          senderRole: 'user',
          message: dto.message,
        },
      ],
    });

    return contact;
  }

  // Owner/User reply
  async sendMessage(senderId: string, dto: SendMessageDto) {
    const contact = await this.contactPropertyModel.findById(dto.contactId);
    if (!contact) throw new HttpException('Conversation not found', 404);

    await this.contactPropertyModel.findByIdAndUpdate(dto.contactId, {
      $push: {
        messages: {
          senderId: new Types.ObjectId(senderId),
          senderRole: dto.senderRole,
          message: dto.message,
        },
      },
      ...(dto.senderRole === 'owner' && { status: 'responded' }),
    });

    return { message: 'Message sent successfully' };
  }

  // Get full chat
  async getFullChat(contactId: string) {
    const chat = await this.contactPropertyModel.findById(contactId);
    if (!chat) throw new HttpException('Conversation not found', 404);
    return chat;
  }
}
