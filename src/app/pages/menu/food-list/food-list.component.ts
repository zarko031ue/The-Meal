import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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
  //Sorting
  key: string;
  reverse: boolean = false;
  // Pagination
  p: number = 1;
  columns: TableColumn[] = [];
  mealId: string;
  updatedMeal: MealBody;

  private destroy$ = new Subject<void>();

  form = this.fb.group({
    columns: this.fb.array([]),
  });
  

  get filters() {
    return this.form.get('columns') as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private columnsService: Columns,
    private fb: FormBuilder,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    this.filterByMealCategory();
    this.filterByAreaCategory();
    this.columns = this.columnsService.columns;

    this.columns.forEach((col) => {
      this.filters.push(
        this.fb.group({
          field: col.field,
          name: '',
        })
      );
    });

    this.filters.valueChanges.subscribe((val) => {
      val.forEach((value) => {
        this.filteredMeals = this.meals.filter((meal) => {
          return meal[value.field]
            .toLowerCase()
            .includes(value.name.toLowerCase());
        });
      });
    });

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
            this.filteredMeals = meal;
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

  searchByIngredients(searchTerm: string) {
    console.log(searchTerm);
    if (searchTerm !== '') {
      this.menuService
        .searchByMainIngredients(searchTerm)
        .subscribe((meals: MealBody[]) => {
          this.filteredMeals = meals
        });
    }
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
