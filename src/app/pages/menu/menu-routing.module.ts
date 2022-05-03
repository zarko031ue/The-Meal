import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FoodDetailsComponent } from "./food-details/food-details.component";
import { FoodEditComponent } from "./food-edit/food-edit.component";
import { FoodListComponent } from "./food-list/food-list.component";

const routes = [
    {path: '', component: FoodListComponent, children: [
        {path: 'new', component: FoodEditComponent},
        {path: ':id', component: FoodDetailsComponent},
        {path: ':id/edit', component: FoodEditComponent}
      ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuRoutingModule {}