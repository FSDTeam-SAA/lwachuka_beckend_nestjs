import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  Req,
  Delete,
  Get,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from 'src/app/middlewares/auth.guard';
import type { Request } from 'express';
import pick from 'src/app/helper/pick';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post(':propertyId')
  @UseGuards(AuthGuard('user'))
  @HttpCode(HttpStatus.CREATED)
  async createBookmark(
    @Req() req: Request,
    @Param('propertyId') propertyId: string,
  ) {
    const result = await this.bookmarkService.createBookmark(
      req.user!.id,
      propertyId,
    );

    return {
      message: 'Bookmark created successfully',
      data: result,
    };
  }

  @Get()
  @UseGuards(AuthGuard('user'))
  @HttpCode(HttpStatus.OK)
  async getMyBookmark(@Req() req: Request) {
    const filters = pick(req.query, [
      'searchTerm',
      'title',
      'description',
      'location',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await this.bookmarkService.getMyBookmark(
      req.user!.id,
      filters,
      options,
    );

    return {
      message: 'Bookmark fetched successfully',
      meta: result.meta,
      data: result.result,
    };
  }

  @Delete(':propertyId')
  @UseGuards(AuthGuard('user'))
  @HttpCode(HttpStatus.OK)
  async removeBookmark(
    @Req() req: Request,
    @Param('propertyId') propertyId: string,
  ) {
    const result = await this.bookmarkService.removeBookmark(
      req.user!.id,
      propertyId,
    );

    return {
      message: 'Bookmark deleted successfully',
      data: result,
    };
  }
}
