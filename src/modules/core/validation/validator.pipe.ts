import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { validate } from './validation.util';

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metadata)) {
      return value;
    }

    return await validate(metatype, value);
  }

  private toValidate(metadata: ArgumentMetadata): boolean {
    const { metatype, type } = metadata;
    if (type === 'custom') {
      return false;
    }
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(typeIn => metatype === typeIn) && !isNil(metatype);
  }
}
