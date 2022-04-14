import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { TableColumn } from 'src/app/models/column.model';
import { MealDetails } from 'src/app/models/meal-details.model';
import { MealBody } from 'src/app/models/meal.model';
import { Columns } from 'src/app/services/columns';
import { MealsService } from 'src/app/services/meals.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss'],
})
export class AllMealsComponent implements OnInit, OnDestroy {
  meals: MealDetails[] = []
  filteredMeals: MealDetails[]= []
  showMessage = false;
  letters$ = this.menuService.getLetters();
  columns: TableColumn[] = [];
  mealId = '';
  updatedMeal: MealBody;


  private destroy$ = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private mealsService: MealsService,
    private columnService: Columns
  ) {}

  ngOnInit(): void {
    // Initialize list of meals by first letter A, to have some data on page when user enters the page
    this.menuService
      .listAllMealsByFirstLetter('a')
      .subscribe((meals: MealDetails[]) => {
        this.meals = meals;
        this.filteredMeals = meals?.slice(0,5);
        console.log(this.filteredMeals)
      });
    this.updateMeal();
    this.addMeal();
    this.columns = this.columnService.columns;
    this.searchByIngredients();
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
          this.filteredMeals = meals?.slice(0,5);
        }
        console.log(meals);
      });
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
            this.filteredMeals = meal;
          });
      });
  }

  addMeal() {
    this.mealsService.addMeal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((meal: MealDetails) => {
        this.filteredMeals.push(meal);
      });
  }

  searchByIngredients() {
    this.menuService.searchValue$
      .pipe(
        switchMap((val: string) => {
          return this.menuService.searchByMainIngredients(val)
        })
      )
      .subscribe((meals: MealDetails[]) => {
       this.filteredMeals = meals;
      })
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
