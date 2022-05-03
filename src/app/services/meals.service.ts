import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MealBody } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private updtMeals = new Subject<MealBody>();
  private meal = new Subject<MealBody>();

  updateMeals$ = this.updtMeals.asObservable();
  addMeal$ = this.meal.asObservable();

  constructor() {}

  updateMeals(idMeal: string, strMeal: string, strMealThumb: string) {
    let data: MealBody = {
      idMeal: idMeal,
      strMealThumb: strMealThumb,
      strMeal: strMeal,
    };
    this.updtMeals.next(data);
  }

  addMeal(id: string, foodImg: string, name: string) {
    let data: MealBody = { idMeal: id, strMealThumb: foodImg, strMeal: name };
    this.meal.next(data);
  }
  


  

  

 
}
