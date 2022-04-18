import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FoodDetailsComponent } from './food-details/food-details.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodListComponent } from './food-list/food-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuRoutingModule } from './menu-routing.module';
import { TableModule } from 'src/app/shared/table-module/table.module';



@NgModule({
  declarations: [
    FoodListComponent, 
    FoodDetailsComponent, 
    FoodEditComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MenuRoutingModule,
    TableModule
  ]
})
export class MenuModule {}
