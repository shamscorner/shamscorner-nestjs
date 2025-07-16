import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Header,
  HostParam,
  // HttpCode,
  // HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  // UseGuards,
  UseInterceptors,
  // UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';

// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  CreateCatDto,
  // createCatSchema
} from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
// import { TransformInterceptor } from './interceptors/transform.interceptor';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CatsService } from './cats.service';
// import { ValidationPipe } from './pipes/validation.pipe';
// import { ParseIntPipe } from './pipes/parse-int.pipe';

// @Controller({
//   // host: 'admin.example.com',
//   host: ':account.example.com',
//   path: 'cats',
// })
@Controller('cats')
// @UseGuards(AuthGuard)
// @UseGuards(RolesGuard)
// @UseGuards(RolesGuard, Guard2, Guard3, ...)
// @UseInterceptors(LoggingInterceptor)
// @UseInterceptors(new LoggingInterceptor())
// @UseInterceptors(TransformInterceptor)
// @UseInterceptors(ErrorsInterceptor)
@UseInterceptors(CacheInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get()
  findAllPagination(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    console.log('activeOnly:', activeOnly, 'page:', page);
    return this.catsService.findAllPagination({ activeOnly, page });
  }

  @Post()
  // @UsePipes(new ValidationPipe(createCatSchema))
  @Roles(['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
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
  findAllWithQueryParam(
    @Query('age', ParseIntPipe) age: number, // ?age=5
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
    return Promise.resolve([]);
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
  findOne(
    // @Param('id', new ParseIntPipe())
    @Param('id', ParseIntPipe)
    id: number /* parameter */,
  ) {
    // console.log('Param is id: ', id);
    return `This action returns a #${id} cat`;
  }

  // @Get(':uuid') // cats/e940614c-7b24-487a-a3dd-5400e8633023
  // findOne(
  //   @Param('uuid', new ParseUUIDPipe())
  //   uuid: string /* parameter */,
  // ) {
  //   console.log('Param is uuid: ', uuid);
  //   return `This action returns a #${uuid} cat`;
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log('update data: ', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get('throw-error')
  throwError() {
    throw new Error('This is a test error');
  }
}
