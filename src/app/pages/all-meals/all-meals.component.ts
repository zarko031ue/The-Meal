import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { MealData } from 'src/app/models/mealBody.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss'],
})
export class AllMealsComponent implements OnInit {
  meals: Meal;
  message = false;
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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

  constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize list of meals by first letter
    this.menuService.listAllMealsByFirstLetter('a').subscribe((meals: Meal) => {
      this.meals = meals;
    });
  }


  // Changing list of meals based on first letter of meal name
  listAllMeals(letter: string) {
    this.menuService
      .listAllMealsByFirstLetter(letter)
      .subscribe((meals: Meal) => {
        if (meals.meals === null) {
          this.message = true;
        } else {
          this.message = false;
          this.meals = meals;
        }
        console.log(meals);
      });
  }

  getLetter(letter: string) {
    console.log(letter);
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
    let data: any = {idMeal:id, strMealThumb:foodImg, strMeal: name}
    this.meals.meals.push(data); 
 }

  updateMeal(idMeal: string, newMeal: MealData) {
    this.meals.meals[idMeal] = newMeal
    console.log( 'mealID', this.meals.meals[idMeal])
 }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
