import {
  Controller,
  Post,
  Body,
  Req,
  Param,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContactpropretyService } from './contactproprety.service';
import { CreateContactpropretyDto } from './dto/create-contactproprety.dto';
import { SendMessageDto } from './dto/send-message.dto';
import type { Request } from 'express';
import { AuthGuard } from 'src/app/middlewares/auth.guard';

@Controller('contact-property')
export class ContactpropretyController {
  constructor(
    private readonly contactpropretyService: ContactpropretyService,
  ) {}

  // Reply
  @Post('send-message')
  @UseGuards(AuthGuard('user', 'vendor', 'agent'))
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Req() req: Request, @Body() dto: SendMessageDto) {
    const senderId = req.user!.id;
    console.log(senderId);
    console.log(dto);
    const result = await this.contactpropretyService.sendMessage(senderId, dto);

    return {
      message: 'Message sent successfully',
      data: result,
    };
  }

  // User first contact
  @Post(':propertyId')
  @UseGuards(AuthGuard('user', 'vendor', 'agent'))
  @HttpCode(HttpStatus.CREATED)
  async createContactProperty(
    @Req() req: Request,
    @Body() dto: CreateContactpropretyDto,
    @Param('propertyId') propertyId: string,
  ) {
    const userId = req.user!.id;

    const result = await this.contactpropretyService.createContactProperty(
      userId,
      dto,
      propertyId,
    );

    return {
      message: 'Contact property created successfully',
      data: result,
    };
  }

  // Get full chat
  @Get(':contactId')
  @HttpCode(HttpStatus.OK)
  async getFullChat(@Param('contactId') contactId: string) {
    return this.contactpropretyService.getFullChat(contactId);
  }
}
