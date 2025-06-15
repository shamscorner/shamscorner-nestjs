import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
// import { ZodSchema } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log(
      'ValidationPipe: Transforming value',
      value,
      'with metatype',
      metatype,
    );
    const object = plainToInstance(metatype, value);
    console.log('ValidationPipe: Converted object', object);
    const errors = await validate(object);
    console.log('ValidationPipe: Validation errors', errors);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: object): boolean {
    const types: object[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

// @Injectable()
// export class ValidationPipe implements PipeTransform {
//   constructor(private schema: ZodSchema) {}

//   transform(value: unknown, metadata: ArgumentMetadata) {
//     try {
//       const parsedValue = this.schema.parse(value);
//       return parsedValue;
//     } catch (error) {
//       throw new BadRequestException('Validation failed');
//     }
//   }
// }
