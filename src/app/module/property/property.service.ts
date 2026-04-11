import { HttpException, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { fileUpload } from 'src/app/helper/fileUploder';
import { getLatLngFromAddress } from 'src/app/helper/geocode';
import { IFilterParams } from 'src/app/helper/pick';
import paginationHelper, { IOptions } from 'src/app/helper/pagenation';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertyModel: mongoose.Model<Property>,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  private buildFilterConditions(filterData: IFilterParams) {
    const filterConditions: any[] = [];

    Object.entries(filterData).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;

      if (['bedrooms', 'bathrooms'].includes(key)) {
        filterConditions.push({
          [key]: Number(value),
        });
      } else if (['parking', 'gatedCommunity', 'staffQuarters'].includes(key)) {
        filterConditions.push({
          [key]: value === 'true' || value === true,
        });
      } else if (key === 'minLand') {
        filterConditions.push({
          landArea: { $gte: Number(value) },
        });
      } else if (key === 'maxLand') {
        filterConditions.push({
          landArea: { $lte: Number(value) },
        });
      } else if (key === 'price') {
        filterConditions.push({
          price: { $gte: Number(value) },
        });
      } else {
        filterConditions.push({
          [key]: value,
        });
      }
    });

    return filterConditions;
  }

  async createProperty(
    userId: string,
    createPropertyDto: CreatePropertyDto,
    files?: Express.Multer.File[],
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    let propertyImages: string[] = [];

    if (files?.length) {
      const uploads = await Promise.all(
        files.map((file) => fileUpload.uploadToCloudinary(file)),
      );

      propertyImages = uploads.map((img) => img.url);
    }

    const fullAddress = `${createPropertyDto.location || ''}`;

    let lat: number | null = null;
    let lng: number | null = null;

    if (fullAddress.trim()) {
      const coords = await getLatLngFromAddress(fullAddress);
      lat = coords.lat;
      lng = coords.lng;
    }

    const property = await this.propertyModel.create({
      ...createPropertyDto,
      images: propertyImages,
      createBy: user._id,
      lat: lat ?? undefined,
      lng: lng ?? undefined,
    });

    return property;
  }

  async getAllProperty(params: IFilterParams, options: IOptions) {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

    const { searchTerm, ...filterData } = params;

    const andCondition: any[] = [];

    const searchAbleFields = [
      'title',
      'listingType',
      'propertyType',
      'location',
      'description',
      'purpose',
      'referenceNumber',
      'status',
    ];

    if (searchTerm) {
      andCondition.push({
        $or: searchAbleFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }

    if (Object.keys(filterData).length > 0) {
      const filterConditions = this.buildFilterConditions(filterData);

      if (filterConditions.length > 0) {
        andCondition.push({ $and: filterConditions });
      }
    }

    const whereConditions =
      andCondition.length > 0 ? { $and: andCondition } : {};

    const result = await this.propertyModel
      .find(whereConditions)
      .sort(
        sortBy ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : { createdAt: -1 },
      )
      .skip(skip)
      .limit(limit)
      .populate('createBy');

    const total = await this.propertyModel.countDocuments(whereConditions);

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async getAllSubscriberUserPropertyTop(
    params: IFilterParams,
    options: IOptions,
  ) {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

    const { searchTerm, ...filterData } = params;

    const andCondition: any[] = [];

    const searchAbleFields = [
      'title',
      'listingType',
      'propertyType',
      'location',
      'description',
      'purpose',
      'referenceNumber',
      'status',
    ];

    if (searchTerm) {
      andCondition.push({
        $or: searchAbleFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }

    if (Object.keys(filterData).length > 0) {
      const filterConditions = this.buildFilterConditions(filterData);

      if (filterConditions.length > 0) {
        andCondition.push({ $and: filterConditions });
      }
    }

    const whereConditions =
      andCondition.length > 0 ? { $and: andCondition } : {};

    let result = await this.propertyModel
      .find(whereConditions)
      .skip(skip)
      .limit(limit)
      .populate('createBy');

    const total = await this.propertyModel.countDocuments(whereConditions);

    result = result.sort((a: any, b: any) => {
      const aSub = a.createBy?.isSubscribed ? 1 : 0;
      const bSub = b.createBy?.isSubscribed ? 1 : 0;

      if (bSub !== aSub) return bSub - aSub;

      if (sortBy) {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async getSingleProperty(id: string) {
    const property = await this.propertyModel.findById(id).populate('createBy');
    if (!property) throw new HttpException('Property not found', 404);

    return property;
  }

  async updateProperty(
    userId: string,
    id: string,
    payload: UpdatePropertyDto,
    files?: Express.Multer.File[],
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);
    const property = await this.propertyModel.findById(id);

    if (!property) throw new HttpException('Property not found', 404);

    if (user.role !== 'admin') {
      if (property.createBy.toString() !== user._id.toString()) {
        throw new HttpException(
          'You are not allow to update this property',
          403,
        );
      }
    }

    const existingImages = Array.isArray(payload.images) ? payload.images : [];

    if (files?.length) {
      const properityImage = await Promise.all(
        files.map((file) => fileUpload.uploadToCloudinary(file)),
      );
      const newImages = properityImage.map((img) => img.url);
      payload.images = [...existingImages, ...newImages];
    }

    const result = await this.propertyModel.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true, runValidators: true },
    );
    return result;
  }

  async deleteProperty(userId: string, id: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);
    const property = await this.propertyModel.findById(id);

    if (!property) throw new HttpException('Property not found', 404);

    if (user.role !== 'admin') {
      if (property.createBy.toString() !== user._id.toString()) {
        throw new HttpException(
          'You are not allow to update this property',
          403,
        );
      }
    }
    const result = await this.propertyModel.findByIdAndDelete(id);
    return result;
  }

  async getMyAgentProperty(
    userId: string,
    params: IFilterParams,
    options: IOptions,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

    const { searchTerm, ...filterData } = params;

    const andCondition: any[] = [{ createBy: userId }];

    const searchAbleFields = [
      'title',
      'listingType',
      'propertyType',
      'location',
      'description',
      'purpose',
      'referenceNumber',
      'status',
    ];

    if (searchTerm) {
      andCondition.push({
        $or: searchAbleFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }

    if (Object.keys(filterData).length > 0) {
      const filterConditions = this.buildFilterConditions(filterData);

      if (filterConditions.length > 0) {
        andCondition.push({ $and: filterConditions });
      }
    }

    const whereConditions = { $and: andCondition };

    const result = await this.propertyModel
      .find(whereConditions)
      .sort({ [sortBy]: sortOrder } as any)
      .skip(skip)
      .limit(limit);

    const total = await this.propertyModel.countDocuments(whereConditions);

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async approvedOrReject(id: string, status: string) {
    const property = await this.propertyModel.findById(id);
    if (!property) throw new HttpException('Property not found', 404);

    if (property.status === 'approved')
      throw new HttpException('Property already approved', 400);
    if (property.status === 'rejected')
      throw new HttpException('Property already rejected', 400);

    const result = await this.propertyModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    return result;
  }

  async getAllPadPropertyListing(params: IFilterParams, options: IOptions) {
    const users = await this.userModel.find({
      role: 'agent',
      isSubscribed: true,
    });

    const subscribedAgentIds = users.map((user) => user._id);

    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

    const { searchTerm, ...filterData } = params;

    const andCondition: any[] = [{ createBy: { $in: subscribedAgentIds } }];

    const searchAbleFields = [
      'title',
      'listingType',
      'propertyType',
      'location',
      'description',
      'purpose',
      'referenceNumber',
      'status',
    ];

    if (searchTerm) {
      andCondition.push({
        $or: searchAbleFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }

    if (Object.keys(filterData).length > 0) {
      const filterConditions = this.buildFilterConditions(filterData);

      if (filterConditions.length > 0) {
        andCondition.push({ $and: filterConditions });
      }
    }

    const whereConditions = { $and: andCondition };

    const result = await this.propertyModel
      .find(whereConditions)
      .sort(
        sortBy ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : { createdAt: -1 },
      )
      .skip(skip)
      .limit(limit)
      .populate('createBy');

    const total = await this.propertyModel.countDocuments(whereConditions);
    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }
}
