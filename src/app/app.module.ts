import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { SearchPipe } from './shared/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule} from 'ng2-order-pipe';

import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FoodListComponent } from './pages/menu/food-list/food-list.component';
import { FoodDetailsComponent } from './pages/menu/food-details/food-details.component';
import { FoodEditComponent } from './pages/menu/food-edit/food-edit.component';
import { AllMealsComponent } from './pages/all-meals/all-meals.component';
import { MealEditComponent } from './pages/all-meals/meal-edit/meal-edit.component'; 
import { MealDetailsComponent } from './pages/all-meals/meal-details/meal-details.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    FoodListComponent,
    FoodDetailsComponent,
    FoodEditComponent,
    SearchPipe,
    AllMealsComponent,
    MealEditComponent,
    MealDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
