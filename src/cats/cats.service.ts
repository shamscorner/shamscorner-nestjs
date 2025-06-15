import { ConflictException, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(private readonly usersService: UsersService) {}

  create(cat: Cat) {
    // get the authenticated user
    // let's assume the user id is 1
    const user = this.usersService.findOne(1);
    // console.log('Authenticated User:', user);
    const userId = user?.id;
    if (!userId) {
      throw new ConflictException('User not found');
    }

    this.cats.push({ ...cat, userId });
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
