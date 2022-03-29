import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MealDetails } from 'src/app/models/meal-details.model';
import { MealData } from 'src/app/models/mealBody.model';
import { MenuService } from 'src/app/services/menu.service';
import { AllMealsComponent } from '../all-meals.component';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss']
})
export class MealEditComponent implements OnInit {
  id: string;
  editMode = false;
  meal: MealDetails;
  ingredients = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private manuService: MenuService,
    private allmeals: AllMealsComponent) { }

    ngOnInit(): void {
      this.manuService.ingredients.subscribe((ingredients: any[]) => {
        this.ingredients = ingredients;
        console.log(this.ingredients);
      });
  
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      });
    }
    form = this.fb.group({
      id: ['', Validators.required],
      imagePath: ['', Validators.required],
      name: ['', Validators.required],
      area: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: this.fb.array([]),
    });
  
    private initForm() {
      let id = '';
      let imagePath = '';
      let name = '';
      let area = '';
      let category = '';
      let ingredients = new FormArray([]);
  
      if (this.editMode) {
        this.manuService.getFoodDetailsById(this.id).subscribe((meal: any) => {
          this.meal = meal.meals[0];
          id = this.meal.idMeal;
          imagePath = this.meal.strMealThumb
          name = this.meal.strMeal;
          area = this.meal.strArea;
          category = this.meal.strCategory;
          for (let ingredient of this.ingredients) {
            ingredients.push(
              this.fb.group({
                name: [ingredient],
              })
            );
          }
          this.form = this.fb.group({
            id: [id, Validators.required],
            imagePath: [imagePath, Validators.required],
            name: [name, Validators.required],
            area: [area, Validators.required],
            category: [category, Validators.required],
            ingredients: ingredients,
          });
        });
      }
    }
  
    get controls() {
      // a getter!
      return (<FormArray>this.form.get('ingredients')).controls;
    }
  
    onAddIngredients() {
      (<FormArray>this.form.get('ingredients')).push(
        this.fb.group({
          name: ['', Validators.required],
        })
      );
    }
  
    onDeleteIngredient(index) {
      (<FormArray>this.form.get('ingredients')).removeAt(index);
    }
  
    onSubmit(form: FormGroup) {
      console.log('form ', form);
      console.log('form.val ', form.value);
  
      const newMeal = new MealData(
        form.value.id, form.value.name, form.value.imagePath,
      )
      if(this.editMode){
        this.allmeals.updateMeal(this.id, newMeal)
      } else {
        this.allmeals.addMeal(form.value.id, form.value.imagePath, form.value.name);
      }
      this.onCancel();
    }
    
    onCancel(){
      if(this.editMode){
        this.router.navigate(['../../', ], {relativeTo: this.route});
      } else {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
   
    }

}
