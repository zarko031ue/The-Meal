import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { TableColumn } from 'src/app/models/column.model';
import { MealBody } from 'src/app/models/meal.model';

import { Columns } from 'src/app/services/columns';
import { MealsService } from 'src/app/services/meals.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  meals: MealBody[] = [];
  mealsArea: MealBody[] = [];
  filteredMeals: MealBody[] = [];
  category: string;
  columns: TableColumn[] = [];
  mealId: string;
  updatedMeal: MealBody;

  private destroy$ = new Subject<void>();

 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private columnsService: Columns,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    this.filterByMealCategory();
    this.filterByAreaCategory();
    this.columns = this.columnsService.columns; 

    this.mealsService
      .updateMeals$
      .pipe(takeUntil(this.destroy$))
      .subscribe((meal: MealBody) => {
        this.mealId = meal.idMeal;
        this.updatedMeal = meal;
        of(this.meals)
          .pipe(
            map((meals: MealBody[]) => {
              return meals.map((meal) => {
                return meal.idMeal === this.mealId
                  ? { ...meal, ...this.updatedMeal }
                  : meal;
              });
            })
          )
          .subscribe((meal: MealBody[]) => {
            this.meals = meal;
          });
      });

    this.mealsService
      .addMeal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((meal: MealBody) => {
        this.meals.push(meal);
      });
  }

  filterByMealCategory() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.category = params['category'];
          return this.menuService.filterByMealCategory(this.category)
        })
      )
      .subscribe((meals: MealBody[]) => {
        this.meals = meals;
        this.filteredMeals = meals;
        console.log('cat', this.meals);
      });
  }

  filterByAreaCategory() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.category = params['category'];
          return this.menuService.filterByAreaCategory(this.category)
        })
      )
      .subscribe((meals: MealBody[]) => {
        console.log(meals);
        this.mealsArea = meals;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
