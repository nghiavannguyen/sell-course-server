import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from 'src/lib/entity/course/wish-list.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from '../dto/create-wish-list.dto';
import { UpdateWishlistDto } from '../dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createDto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = this.wishlistRepository.create({
      id: createDto.userId,
      addedAt: new Date(createDto.addedAt),
      course: { id: createDto.courseId } as any,
    });
    return wishlist;
  }

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find();
  }

  async findOne(id: string): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
    }
    return wishlist;
  }

  async update(id: string, updateDto: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    Object.assign(wishlist, updateDto);
    return await this.wishlistRepository.save(wishlist);
  }

  async remove(id: string): Promise<void> {
    const wishlist = await this.findOne(id);
    await this.wishlistRepository.remove(wishlist);
  }
}
