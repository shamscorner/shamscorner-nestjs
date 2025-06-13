import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
// import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // If I import here, everything would be shared and sigleton.
  controllers: [CatsController],
  // I can pass the UsersService here, but that would create a new instance every time the CatsService is created.
  providers: [CatsService],
})
export class CatsModule {}
