import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MealDetails } from 'src/app/models/meal-details.model';
import { MealsService } from 'src/app/services/meals.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
})
export class FoodEditComponent implements OnInit {
  id: string;
  editMode = false;
  meal: MealDetails;
  ingredients: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private manuService: MenuService,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    this.manuService.ingredients.subscribe((ingredients: string[]) => {
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
    console.log('form.val ', form);

    if(this.editMode){
      this.mealsService.updateMeals(form.value.id,form.value.name, form.value.imagePath)
    } else {
      this.mealsService.addMeal(form.value.id, form.value.imagePath, form.value.name);
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
