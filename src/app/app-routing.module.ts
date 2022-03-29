import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AllMealsComponent } from './pages/all-meals/all-meals.component';
import { MealDetailsComponent } from './pages/all-meals/meal-details/meal-details.component';
import { MealEditComponent } from './pages/all-meals/meal-edit/meal-edit.component';
import { HomeComponent } from './pages/home/home.component';
import { FoodDetailsComponent } from './pages/menu/food-details/food-details.component';
import { FoodEditComponent } from './pages/menu/food-edit/food-edit.component';
import { FoodListComponent } from './pages/menu/food-list/food-list.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'about', component: AboutComponent},
  {path: 'all-meals', component: AllMealsComponent, children: [
    {path: 'new', component: MealEditComponent},
    {path: ':id', component: MealDetailsComponent},
    {path: ':id/edit', component: MealEditComponent}
  ]},
  {path: 'menu/:category', component: FoodListComponent, children: [
    {path: 'new', component: FoodEditComponent},
    {path: ':id', component: FoodDetailsComponent},
    {path: ':id/edit', component: FoodEditComponent}
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
