import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Get,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from 'src/app/middlewares/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/app/helper/fileUploder';
import type { Request } from 'express';
import pick from 'src/app/helper/pick';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseGuards(AuthGuard('agent', 'seller', 'vendor', 'admin'))
  @UseInterceptors(FilesInterceptor('images', 10, fileUpload.uploadConfig))
  async createProperty(
    @Req() req: Request,
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const userId = req.user!.id;

    return this.propertyService.createProperty(
      userId,
      createPropertyDto,
      files,
    );
  }

  @Get()
  async getAllProperties(@Req() req: Request) {
    const filters = pick(req.query, [
      'searchTerm',
      'title',
      'listingType',
      'propertyType',
      'kitchenType',
      'location',
      'finishes',
      'balconyType',
      'storage',
      'coolingSystem',
      'moveInStatus',
      'description',
      'propertyCommunityAmenities',
      'purpose',
      'referenceNumber',
    ]);
    const options = pick(req.query, ['page', 'limit']);
    const result = await this.propertyService.getAllProperty(filters, options);

    return {
      message: 'All property retrieved successfully',
      data: result,
    };
  }
}
