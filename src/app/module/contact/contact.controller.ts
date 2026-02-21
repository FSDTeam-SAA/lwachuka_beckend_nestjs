import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import pick from 'src/app/helper/pick';
import type { Request } from 'express';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/app/middlewares/auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createContact(@Body() createContactDto: CreateContactDto) {
    const result = await this.contactService.createContact(createContactDto);

    return {
      message: 'Contact created successfully',
      data: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('admin'))
  async getAllContact(@Req() req: Request) {
    const filters = pick(req.query, [
      'searchTerm',
      'firstName',
      'lastName',
      'email',
      'phone',
      'message',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await this.contactService.getContacts(filters, options);
    return {
      message: 'Contact fetched successfully',
      meta: result.meta,
      data: result.data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('admin'))
  async getSingleContact(@Param('id') id: string) {
    const result = await this.contactService.getSingleContact(id);
    return {
      message: 'Contact fetched successfully',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('admin'))
  async updateContact(
    @Param('id') id: string,
    @Body() payload: UpdateContactDto,
  ) {
    const result = await this.contactService.updateContact(id, payload);
    return {
      message: 'Contact updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('admin'))
  async deleteContact(@Param('id') id: string) {
    const result = await this.contactService.deleteContact(id);
    return {
      message: 'Contact deleted successfully',
      data: result,
    };
  }
}
