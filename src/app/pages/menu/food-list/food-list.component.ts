import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { TableColumn } from 'src/app/models/column.model';
import { Meal } from 'src/app/models/meal';
import { MealData } from 'src/app/models/mealBody.model';
import { Columns } from 'src/app/services/columns';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  meals: MealData[] = [];
  mealsArea: MealData[] = [];
  filteredMeals = [];
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
  columns: TableColumn[] = [];

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
    private fb: FormBuilder
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
  }

  
   
  

  filterByMealCategory() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.category = params['category'];
          return this.menuService.filterByMealCategory(this.category).pipe(
            map((meals: Meal) => {
              return meals.meals;
            })
          );
        })
      )
      .subscribe((meals: any) => {
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
          return this.menuService.filterByAreaCategory(this.category).pipe(
            map((meals:Meal) => {
              return meals.meals;
            })
          );
        })
      )
      .subscribe((meals:any) => {
        this.mealsArea = meals;
      });
  }

  searchChange() {
    this.ingredients = !this.ingredients;
    console.log(this.ingredients);
  }

  searchByIngredients(searchTerm: string) {
    console.log(searchTerm);
    if (searchTerm !== '') {
      this.menuService
        .searchByMainIngredients(searchTerm)
        .pipe(
          map((meal) => {
            return meal.meals;
          })
        )
        .subscribe((meals: any) => {
          this.filteredMeals = meals;
        });
    }
  }
  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  addMeal(id: string, foodImg: string, name: string) {
    let data: any = { idMeal: id, strMealThumb: foodImg, strMeal: name };
    this.meals.push(data);
  }

  updateMeal(idMeal: string, strMeal: string, strMealThumb: string) {
    console.log('click', idMeal);
    let data: MealData = {
      idMeal: idMeal,
      strMealThumb: strMealThumb,
      strMeal: strMeal,
    };
    of(this.meals)
      .pipe(
        map((meals) => {
          return meals.map((meal) => {
            return meal.idMeal === idMeal ? { ...meal, ...data } : meal;
          });
        })
      )
      .subscribe((meal: any) => {
        this.filteredMeals = meal;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
