import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MealDetails } from 'src/app/models/meal-details.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {
  id: string;
  meal: MealDetails;
  ingredients: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.id = params['id'];
        return this.menuService.getFoodDetailsById(this.id);
      })
    ).subscribe(
      (meal: any) => {
        this.meal = meal.meals[0];        
        this.ingredients = [];
        this.listIngredients();
      }
    )
  }

  listIngredients() {
    for (let i = 1; i < 21; i++) {
      let ingredient;
      if (this.meal[`strMeasure${i}`] !== null
        && this.meal[`strMeasure${i}`] !== undefined
        && this.meal[`strIngredient${i}`] !== undefined
        && this.meal[`strIngredient${i}`] !== null
        && this.meal[`strIngredient${i}`] !== '') {
        ingredient = `${this.meal[`strMeasure${i}`]} - ${this.meal[`strIngredient${i}`]}`;
        this.ingredients.push(ingredient)
        console.log(this.ingredients)
        this.menuService.ingredients.next(this.ingredients);
      }
    }
  }
  
  onDeleteRecipe(){}


  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
