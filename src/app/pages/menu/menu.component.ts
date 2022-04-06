import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AreaData, CategoryData } from 'src/app/models/category.model';
import { MenuService } from 'src/app/services/menu.service';
import { MealBody } from 'src/app/models/meal.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  mealCategories: CategoryData[];
  nationalDishesCategories: AreaData[];

  filteredMealsCategories: CategoryData[] = [];
  filteredNationalCategories:AreaData[] = [];


  form = this.fb.group({
    value: ['']
  })
  
  get filters() {
    return this.form.get('value')
  }

  constructor(private menuService: MenuService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getMealCategories();
    this.getNationalDishesCategories();
   
    this.filters.valueChanges.subscribe(val => {
      this.filteredMealsCategories = this.mealCategories.filter(meal => {
         return meal['strCategory'].toLowerCase().includes(val.toLowerCase())
      })
    })
    this.filters.valueChanges.subscribe(val => {
      this.filteredNationalCategories = this.nationalDishesCategories.filter(meal => {
         return meal['strArea'].toLowerCase().includes(val.toLowerCase())
      })
    })
  }

  getMealCategories() {
    this.menuService.getMealCategories().subscribe((categories: CategoryData[]) => {
      this.mealCategories = categories
      this.filteredMealsCategories = categories
    });
  }

  getNationalDishesCategories() {
    this.menuService
      .getNationalDishesCategories()
      .subscribe((nationalDishesCategories: AreaData[]) => {
        console.log(nationalDishesCategories);
        this.nationalDishesCategories = nationalDishesCategories
        this.filteredNationalCategories = nationalDishesCategories
      });
  }

  filterByMealCategory(category: string) {
    this.menuService.filterByMealCategory(category).subscribe((meals: MealBody[]) => {
    });
  }

  filterByAreaCategory(category: string) {
    this.menuService.filterByAreaCategory(category).subscribe((meals: MealBody[]) => {
    });
  }
}
