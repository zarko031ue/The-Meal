import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllMealsRoutingModule } from './all-meals-routing.module';
import { AllMealsComponent } from './all-meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { TableModule } from 'src/app/shared/table-module/table.module';


@NgModule({
  declarations: [
    AllMealsComponent,
    MealEditComponent,
    MealDetailsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AllMealsRoutingModule,
    TableModule
  ],
  
})
export class AllMealsModule {}
