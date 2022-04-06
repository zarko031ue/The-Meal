import { Pipe, PipeTransform } from '@angular/core';
import { MealDetails } from '../models/meal-details.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value : MealDetails[], filterString: string, propName: string): MealDetails[] {
    const result: MealDetails[] = []; 
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
