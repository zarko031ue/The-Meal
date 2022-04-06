import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FoodDetailsComponent } from './food-details/food-details.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodListComponent } from './food-list/food-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  declarations: [FoodListComponent, FoodDetailsComponent, FoodEditComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    MenuRoutingModule
  ]
})
export class MenuModule {}
