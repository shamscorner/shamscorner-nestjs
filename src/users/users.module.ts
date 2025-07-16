import {
  // Global,
  Module,
} from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// @Global() // not recommended for most cases, use only if you need a truly global service
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService to be used in other modules
})
export class UsersModule {}
