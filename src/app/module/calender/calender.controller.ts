import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import { CalenderService } from './calender.service';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { AuthGuard } from 'src/app/middlewares/auth.guard';
import type { Request } from 'express';
import pick from 'src/app/helper/pick';

@Controller('calender')
export class CalenderController {
  constructor(private readonly calenderService: CalenderService) {}

  @Post(':propertyId')
  @UseGuards(AuthGuard('user'))
  @HttpCode(HttpStatus.CREATED)
  async createCalender(
    @Req() req: Request,
    @Body() createCalenderDto: CreateCalenderDto,
    @Param('propertyId') propertyId: string,
  ) {
    const userId = req.user!.id;
    const result = await this.calenderService.createCalender(
      userId,
      createCalenderDto,
      propertyId,
    );

    return {
      message: 'Calender created successfully',
      data: result,
    };
  }

  @Get('my-bookings')
  @UseGuards(AuthGuard('user'))
  @HttpCode(HttpStatus.OK)
  async getMyBookCalender(@Req() req: Request) {
    const userId = req.user!.id;
    const filters = pick(req.query, [
      'searchTerm',
      'firstName',
      'lastName',
      'email',
      'customMessage',
      'moveInData',
      'phone',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await this.calenderService.getMyBookCalender(
      userId,
      filters,
      options,
    );

    return {
      message: 'Calender retrieved successfully',
      meta: result.meta,
      data: result.data,
    };
  }

  @Get('my-vendor-bookings')
  @UseGuards(AuthGuard('vendor'))
  @HttpCode(HttpStatus.OK)
  async getMyVendorBookCalender(@Req() req: Request) {
    const userId = req.user!.id;
    const filters = pick(req.query, [
      'searchTerm',
      'firstName',
      'lastName',
      'email',
      'customMessage',
      'moveInData',
      'phone',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await this.calenderService.getMyVendorBookCalender(
      userId,
      filters,
      options,
    );

    return {
      message: 'Calender retrieved successfully',
      meta: result.meta,
      data: result.data,
    };
  }
}
