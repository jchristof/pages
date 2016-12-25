import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterFileTypePipe implements PipeTransform {
  transform(value: Array<File>, args: string[]): any {
    if (!value) return value;

    return value.filter(x=>x.name.indexOf(args[0]) !== -1);
  }
}