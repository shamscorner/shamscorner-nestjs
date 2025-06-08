import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HostParam,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

// @Controller({
//   // host: 'admin.example.com',
//   host: ':account.example.com',
//   path: 'cats',
// })
@Controller('cats')
export class CatsController {
  @Get()
  findAll() {
    return 'This action returns all cats';
  }

  @Get('breed') // subpath
  findBreed() {
    return 'This action returns all cats of a breed';
  }

  @Get('request-example')
  findAllWithRequest(@Req() request: Request /* request object */) {
    console.log(request);
    return 'Check server console for request object';
  }

  @Post()
  @HttpCode(204) // custom status code
  create(@Body() createCatDto: CreateCatDto /* request body */) {
    console.log('create-data', createCatDto);
    return 'This action adds a new cat with custom status code';
    // return {
    //   name: createCatDto.name,
    //   age: createCatDto.age,
    //   breed: createCatDto.breed,
    // };
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

  @Get('query-params')
  async findAllWithQueryParam(
    @Query('age') age: number, // ?age=5
    @Query('breed') breed: string, // ?breed=persian
  ) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
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

  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }

  @Get('async')
  async findAllAsync(): Promise<any[]> {
    return [];
  }

  @Get('rxjs-observable')
  findAllObservable(): Observable<any[]> {
    return of([]);
  }

  // @Get(':id') // /cats/1
  // findOne(@Param() params: { id: number } /* parameter */) {
  //   return `This action returns a #${params.id} cat`;
  // }

  @Get(':id') // /cats/1
  findOne(@Param('id') id: number /* parameter */) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log('update data: ', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
