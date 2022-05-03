import { Injectable } from '@angular/core';
import { TableColumn } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class Columns {
  columns: TableColumn[] = [
    { title: 'ID', field: 'idMeal', sortable: true, searchable: true },
    { title: 'Img', field: 'strMealThumb', sortable: false, searchable: false },
    { title: 'Name', field: 'strMeal', sortable: true, searchable: true },
  ];
  
  constructor() {}
}
