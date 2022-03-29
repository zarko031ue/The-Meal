import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { MealData } from 'src/app/models/mealBody.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  meals: Meal;
  mealsArea: Meal;
  category: string;
  //Sorting
  key: string;
  reverse: boolean = false;
  // Pagination
  p: number = 1;
  // Search by
  searchKey: string = '';
  sarchTerm: string = '';
  // Search change by name or ingredients
  ingredients = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.filterByMealCategory();
    this.filterByAreaCategory();
  }

  filterByMealCategory() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.category = params['category'];
          return this.menuService.filterByMealCategory(this.category);
        })
      )
      .subscribe((meals: Meal) => {
        this.meals = meals;
        console.log('cat', meals);
      });
  }

  filterByAreaCategory() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.category = params['category'];
          return this.menuService.filterByAreaCategory(this.category);
        })
      )
      .subscribe((mealsByArea: Meal) => {
        this.mealsArea = mealsByArea;
        console.log(mealsByArea);
      });
  }

  searchChange() {
    this.ingredients = !this.ingredients;
    console.log(this.ingredients);
  }

  searchByIngredients(searchTerm: string) {
    if (searchTerm !== '') {
      this.menuService
        .searchByMainIngredients(searchTerm)
        .subscribe((meals: Meal) => {
          this.meals = meals;
        });
    }
  }

  searchByName(searchTerm: string) {
    this.searchKey = searchTerm;
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  addMeal(id: string, foodImg: string, name: string){
    let data:any = {idMeal:id, strMealThumb:foodImg, strMeal: name}
    this.meals.meals.push(data); 
 }
 
  updateMeal(idMeal: string, newMeal: MealData) {
   this.meals.meals[idMeal] = newMeal
   console.log( 'mealID', this.meals.meals[idMeal])
 }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
