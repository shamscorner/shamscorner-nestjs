import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log('value', value, typeof value);
    const val = parseInt(value, 10);
    console.log('val', val, typeof val);
    if (isNaN(val)) {
      // throw new BadRequestException('Validation failed');
      return 0;
    }
    return val;
  }
}
