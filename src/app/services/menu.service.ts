import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { AreaCategories, Categories } from '../models/category.model';
import { MealDet, MealDetails } from '../models/meal-details.model';
import { Meals } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public ingredients = new BehaviorSubject<string[]>([]);
  public search = new Subject<string>();

  searchValue$ = this.search.asObservable();
  
  letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  
  foodCatURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  nationalDishesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  foodDetailsId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  filterByAreaCategoryURL ='https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  searchByIngredientURL =  'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  searchAllMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  listAllMealsByFrstLettURL ='https://www.themealdb.com/api/json/v1/1/search.php?f=';

  constructor(private http: HttpClient) {}

  getMealCategories() {
    return this.http.get<Categories>(this.foodCatURL).pipe(
      map((categories: Categories) => {
        return categories.meals;
      })
    );
  }

  getNationalDishesCategories() {
    return this.http.get<AreaCategories>(this.nationalDishesURL).pipe(
      map((categories: AreaCategories) => {
        return categories.meals;
      })
    );
  }

  filterByMealCategory(category: string) {
    return this.http.get<Meals>(this.categoryURL + category).pipe(
      map((meals: Meals) => {
        return meals.meals;
      })
    );
  }

  filterByAreaCategory(category: string) {
    return this.http.get<Meals>(this.filterByAreaCategoryURL + category).pipe(
      map((meals: Meals) => {
        return meals.meals;
      })
    );
  }

  getFoodDetailsById(id: string) {
    return this.http.get<MealDetails>(this.foodDetailsId + id);
  }

  searchByMainIngredients(searchTerm: string) {
    return this.http.get<Meals>(this.searchByIngredientURL + searchTerm).pipe(
      map((meal: Meals) => {
          return meal.meals
      })
    )
  }

  listAllMealsByFirstLetter(letter: string) {
    return this.http.get<MealDet>(this.listAllMealsByFrstLettURL + letter).pipe(
      map((meals: MealDet) => {
        return meals.meals;
      })
    );
  }

  getLetters(): Observable<any[]> {
    return of(this.letters)
  }
}
