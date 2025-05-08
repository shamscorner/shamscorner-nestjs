import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('breed') // subpath
  findBreed(): string {
    return 'This action returns all cats of a breed';
  }

  @Get('request-example')
  findAllWithRequest(@Req() request: Request /* request object */): string {
    console.log(request);
    return 'Check server console for request object';
  }

  @Post()
  @HttpCode(204) // custom status code
  create() {
    return 'This action adds a new cat with custom status code';
  }

  @Get('abcd/*') // wildcard route
  findAllWithWildcard() {
    return 'This route uses a wildcard';
  }

  @Post('response-header')
  @Header('Cache-Control', 'no-store') // response header
  createWithResponseHeader() {
    return 'This action adds a new cat with response header';
  }

  @Get('redirect')
  @Redirect('https://docs.nestjs.com', 302) // redirects
  getDocs() {
    return 'Redirecting to NestJS documentation...';
  }

  @Get('redirect-custom')
  @Redirect('https://docs.nestjs.com', 302)
  getV5Docs(@Query('version') version /* query parameter ?version=5 */) {
    if (version && version === '5') {
      return {
        url: 'https://docs.nestjs.com/v5/',
        statusCode: 303,
      }; // dynamic redirect: HttpRedirectResponse
    }
  }
}
