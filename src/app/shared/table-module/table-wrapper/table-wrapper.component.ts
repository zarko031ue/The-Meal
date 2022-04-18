import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/models/column.model';
import { MealBody } from 'src/app/models/meal.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent implements OnInit {
  @Input() data: MealBody[] = [];
  @Input() columns: TableColumn[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  onSearch(search: string) {
    console.log(search);
    this.menuService
      .searchByMainIngredients(search)
      .subscribe((meals: MealBody[]) => {
        this.data = meals;
      });
  }
}
