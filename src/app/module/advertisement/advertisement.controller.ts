import { Controller, Post, Body, Req } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import type { Request } from 'express';

@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  async createAdvertisement(
    @Req() req: Request,
    @Body() createAdvertisementDto: CreateAdvertisementDto,
  ) {
    const userId = req.user!.id;
    const result = await this.advertisementService.createAdvertisement(
      userId,
      createAdvertisementDto,
    );
    return result;
  }
}
