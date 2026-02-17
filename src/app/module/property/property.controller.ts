import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from 'src/app/middlewares/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/app/helper/fileUploder';
import type { Request } from 'express';

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
}
