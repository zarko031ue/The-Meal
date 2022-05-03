import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AllMealsComponent } from "./all-meals.component";
import { MealDetailsComponent } from "./meal-details/meal-details.component";
import { MealEditComponent } from "./meal-edit/meal-edit.component";

const routes = [
    {path: '', component: AllMealsComponent, children: [
        {path: 'new', component: MealEditComponent},
        {path: ':id', component: MealDetailsComponent},
        {path: ':id/edit', component: MealEditComponent}
      ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllMealsRoutingModule{}