import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wish-list.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}
