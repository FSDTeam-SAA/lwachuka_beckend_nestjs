import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Put,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import pick from 'src/app/helper/pick';
import type { Request } from 'express';
import { AuthGuard } from 'src/app/middlewares/auth.guard';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('admin'))
  async createSubscriber(@Body() createSubscriberDto: CreateSubscriberDto) {
    const result = await this.subscriberService.create(createSubscriberDto);
    return result;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllSubscribers(@Req() req: Request) {
    const query = req.query;
    const filters = pick(query, [
      'searchTerm',
      'name',
      'description',
      'status',
    ]);
    const options = pick(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await this.subscriberService.getAllSubscribers(
      filters,
      options,
    );
    return {
      message: 'All subscribers retrieved successfully',
      meta: result.meta,
      data: result.data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubscriber(@Param('id') id: string) {
    const result = await this.subscriberService.getSingleSubscriber(id);
    return {
      message: 'Subscriber retrieved successfully',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('admin'))
  async updateSubscriber(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    const result = await this.subscriberService.updateSubscriber(
      id,
      updateSubscriberDto,
    );
    return {
      message: 'Subscriber updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('admin'))
  async deleteSubscriber(@Param('id') id: string) {
    const result = await this.subscriberService.deleteSubscriber(id);
    return {
      message: 'Subscriber deleted successfully',
      data: result,
    };
  }

  @Post('pad-listing/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('user', 'vendor'))
  async padListing(@Req() req: Request, @Param('id') id: string) {
    const result = await this.subscriberService.padListing(req.user!.id, id);
    return {
      message: 'Pad listing created successfully',
      data: result,
    };
  }
}
