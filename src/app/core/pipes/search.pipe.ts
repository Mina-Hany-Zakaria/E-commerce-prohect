import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(Data: any[], term: string): any[] {
    return Data.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
