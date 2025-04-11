import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateWishlistDto } from '../dto/create-wish-list.dto';
import { UpdateWishlistDto } from '../dto/update-wishlist.dto';
import { WishlistService } from '../service/wishlist.service';

@ApiTags('wishlists')
@Controller('wishlists')
@ApiBearerAuth()

export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createDto: CreateWishlistDto) {
    return this.wishlistService.create(createDto);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateWishlistDto) {
    return this.wishlistService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
