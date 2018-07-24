import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'console'
})
export class ConsolePipe implements PipeTransform {
  transform(value: any): string {
    console.log(value);
    return '';
  }
}
