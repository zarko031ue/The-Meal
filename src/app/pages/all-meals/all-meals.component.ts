import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subject, takeUntil } from 'rxjs';
import { MealDetails } from 'src/app/models/meal-details.model';
import { MealBody } from 'src/app/models/meal.model';
import { MealsService } from 'src/app/services/meals.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss'],
})
export class AllMealsComponent implements OnInit {
  meals: MealDetails[];
  showMessage = false;
  letters$ = this.menuService.getLetters()
  //Sorting
  key = '';
  reverse = false;
  // Pagination
  p: number = 1;
  // Search by
  searchKey: string = '';
  sarchTerm: string = '';
  // Search change by name or ingredients
  ingredients = false;
  mealId = '';
  updatedMeal: MealBody;
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    // Initialize list of meals by first letter A, to have some data on page when user enters the page
    this.menuService
      .listAllMealsByFirstLetter('a')
      .subscribe((meals: MealDetails[]) => {
        this.meals = meals;
      });
    this.updateMeal();
    this.addMeal();
  }

  // Changing list of meals based on first letter of meal name
  listAllMeals(letter: string) {
    this.menuService
      .listAllMealsByFirstLetter(letter)
      .subscribe((meals: MealDetails[]) => {
        console.log(meals);
        if (meals === null) {
          this.showMessage = true;
        } else {
          this.showMessage = false;
          this.meals = meals;
        }
        console.log(meals);
      });
  }

  searchChange() {
    this.ingredients = !this.ingredients;
  }

  searchByIngredients(searchTerm: string) {
    if (searchTerm !== '') {
      this.menuService
        .searchByMainIngredients(searchTerm)
        .subscribe((meals: MealDetails[]) => {
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

  updateMeal() {
    this.mealsService.updateMeals$
      .pipe(takeUntil(this.destroy$))
      .subscribe((meal: MealDetails) => {
        this.mealId = meal.idMeal;
        this.updatedMeal = meal;
        of(this.meals)
          .pipe(
            map((meals: MealDetails[]) => {
              return meals.map((meal) => {
                return meal.idMeal === this.mealId
                  ? { ...meal, ...this.updatedMeal }
                  : meal;
              });
            })
          )
          .subscribe((meal: MealDetails[]) => {
            this.meals = meal;
          });
      });
  }

  addMeal() {
    this.mealsService.addMeal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((meal: MealDetails) => {
        this.meals.push(meal);
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
