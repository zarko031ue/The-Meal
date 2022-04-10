import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TableColumn } from 'src/app/models/column.model';
import { MealBody } from 'src/app/models/meal.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn[];
  @Input() gridData: MealBody[];
  @Input() filteredData: MealBody[];

  //Sorting
  key = '';
  reverse = false;
  // Pagination
  p: number = 1;

  form = this.fb.group({
    columns: this.fb.array([]),
  });

  get filters() {
    return this.form.get('columns') as FormArray;
  }

  constructor(private fb: FormBuilder, private manuService: MenuService) {}

  ngOnInit(): void {
    this.columns.forEach((col) => {
      this.filters.push(
        this.fb.group({
          field: col.field,
          name: '',
        })
      );
    });

    this.filters.valueChanges.subscribe((val) => {
      val.forEach((value) => {
        this.filteredData = this.gridData.filter((meal) => {
          return meal[value.field]
            .toLowerCase()
            .includes(value.name.toLowerCase());
        });
      });
    });
  }

  searchByIngredients(searchTerm: string) {
    console.log(searchTerm);
    if (searchTerm !== '') {
      this.manuService
        .searchByMainIngredients(searchTerm)
        .subscribe((meals: MealBody[]) => {
          this.filteredData = meals
        });
    }
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
