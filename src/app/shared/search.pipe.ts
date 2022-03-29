import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value : any, filterString: string, propName: string): any {
    const result: any = []; 
    if(!value || filterString === '' || propName === ''){
      return value;
    }
    value.forEach((val: any) => {
      if(val[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(val);
      }
    });
    return result;
  }

}
