import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../models/meal';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public ingredients = new BehaviorSubject<string[]>([])
  
  foodCatURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  nationalDishesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  foodDetailsId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
  filterByAreaCategoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  searchByIngredientURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  searchAllMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f='
  listAllMealsByFrstLettURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

  constructor(private http: HttpClient) { 
    
  }

  getMealCategories() {
    return this.http.get<Meal>(this.foodCatURL);
  }

  getNationalDishesCategories(){ 
    return this.http.get<Meal>(this.nationalDishesURL);
  }

  filterByMealCategory(category: string) {
    return this.http.get<Meal>(this.categoryURL + category);
  }

  filterByAreaCategory(category: string) {
    return this.http.get<Meal>(this.filterByAreaCategoryURL + category)
  }
  
  getFoodDetailsById(id: string) {
    return this.http.get<Meal>(this.foodDetailsId + id);
  }
  
  searchByMainIngredients(searchTerm: string) {
    return this.http.get<Meal>(this.searchByIngredientURL + searchTerm)
  }

  listAllMealsByFirstLetter(letter: string) {
    return this.http.get<Meal>(this.listAllMealsByFrstLettURL + letter)
  }
  
  
}
