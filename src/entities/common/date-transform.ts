import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer{
  to(value: Date): number {
    if(!value) return null;
    return value.getTime();
  }

  from(value: number): Date {
    if(!value) return null;
    return new Date(value);
  }
}
