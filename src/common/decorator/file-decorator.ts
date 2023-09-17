import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { ApiBody } from '@nestjs/swagger';

interface IsFileOptions {
    mime: ('image/jpg' | 'image/png' | 'image/jpeg')[];
}

export function IsFile(options: IsFileOptions, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value?.mimetype && (options?.mime ?? []).includes(value?.mimetype)) {
                        return true;
                    }                        
                    return false;
                },
            }
        });
    }
}


export const ApiFile = (fileName: string = 'file'): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey, descriptor);
};