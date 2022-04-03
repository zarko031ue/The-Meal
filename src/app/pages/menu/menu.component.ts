import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Meal } from 'src/app/models/meal';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  mealCategories: Meal[];
  nationalDishesCategories: Meal[];
  searchKey: string = '';
  searchTerm: string = '';
  filteredMealsCategories = [];
  filteredNationalCategories = [];


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
      console.log(val)
      this.filteredMealsCategories = this.mealCategories.filter(meal => {
         return meal['strCategory'].toLowerCase().includes(val.toLowerCase())
      })
    })
    this.filters.valueChanges.subscribe(val => {
      console.log(val)
      this.filteredNationalCategories = this.nationalDishesCategories.filter(meal => {
         return meal['strArea'].toLowerCase().includes(val.toLowerCase())
      })
    })
  }

  getMealCategories() {
    this.menuService.getMealCategories().subscribe((categories: any) => {
      this.mealCategories = categories.meals
      this.filteredMealsCategories = categories.meals
    });
  }

  getNationalDishesCategories() {
    this.menuService
      .getNationalDishesCategories()
      .subscribe((nationalDishesCategories: any) => {
        this.nationalDishesCategories = nationalDishesCategories.meals
        this.filteredNationalCategories = nationalDishesCategories.meals
      });
  }

  filterByMealCategory(category: string) {
    this.menuService.filterByMealCategory(category).subscribe((meals: Meal) => {
      console.log(meals);
    });
  }

  filterByAreaCategory(category: string) {
    this.menuService.filterByAreaCategory(category).subscribe((meals: Meal) => {
      console.log(meals);
    });
  }

  onClearSearch(){
    this.searchKey = '';
  }
}
