import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { Notification } from 'src/lib/entity/user/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(createDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      title: createDto.title,
      message: createDto.message,

      isRead: createDto.isRead ?? false,
      user: { id: createDto.userId } as any,
    });
    return await this.notificationRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
    return notification;
  }


  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepository.remove(notification);
  }
}
