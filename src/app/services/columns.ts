import { Injectable } from '@angular/core';
import { TableColumn } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class Columns {
  columns: TableColumn[] = [
    { title: 'ID', field: 'idMeal' },
    { title: 'Img', field: 'strMealThumb' },
    { title: 'Name', field: 'strMeal' },
  ];
  constructor() {}
}
