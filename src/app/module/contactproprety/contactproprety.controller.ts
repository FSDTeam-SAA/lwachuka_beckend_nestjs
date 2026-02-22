import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { ContactpropretyService } from './contactproprety.service';
import { CreateContactpropretyDto } from './dto/create-contactproprety.dto';
import type { Request } from 'express';

@Controller('contact-property')
export class ContactpropretyController {
  constructor(
    private readonly contactpropretyService: ContactpropretyService,
  ) {}

  @Post(':propertyId')
  async createContactProperty(
    @Req() req: Request,
    @Body() createContactpropretyDto: CreateContactpropretyDto,
    @Param('propertyId') propertyId: string,
  ) {
    const userId = req.user!.id;
    const result = await this.contactpropretyService.createContactProperty(
      userId,
      createContactpropretyDto,
      propertyId,
    );

    return {
      message: 'Contact property created successfully',
      data: result,
    };
  }
}
