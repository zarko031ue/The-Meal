import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllMealsRoutingModule } from './all-meals-routing.module';
import { AllMealsComponent } from './all-meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { SearchPipe } from 'src/app/shared/search.pipe';
import { TableModule } from 'src/app/shared/table-module/table.module';


@NgModule({
  declarations: [
    AllMealsComponent,
    MealEditComponent,
    MealDetailsComponent,
    SearchPipe,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    AllMealsRoutingModule,
    TableModule
  ],
  
})
export class AllMealsModule {}
