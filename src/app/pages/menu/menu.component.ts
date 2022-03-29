import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  mealCategories: any;
  nationalDishesCategories: Meal;
  searchKey: string = '';
  searchTerm: string = '';
  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.getMealCategories();
    this.getNationalDishesCategories();

  }

  getMealCategories() {
    this.menuService.getMealCategories().subscribe((categories: Meal) => {
      this.mealCategories = categories;
    });
  }

  getNationalDishesCategories() {
    this.menuService
      .getNationalDishesCategories()
      .subscribe((nationalDishesCategories: Meal) => {
        this.nationalDishesCategories = nationalDishesCategories;
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

  searchByCategory(searchTerm: string) {
    this.searchKey = searchTerm;
  }
}
