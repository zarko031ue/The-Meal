import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() searchVal = new EventEmitter<string>();
  @Input() rows = 10;
  @Input() columns: TableColumn[];
  @Input()
  set data(data: MealBody[]) {
    this._data = data;
    this.filteredData = data;
    this.totalCount = data.length;
    this.currentPage = this.page;
    this.pages = this.calculatePages(this.totalCount, this.rows);
    this.filteredData = data.slice(
      (this.page - 1) * this.rows,
      this.page * this.rows
    );
  }

  get data(): MealBody[] {
    return this._data;
  }


  private _data: MealBody[];
  dataForDisplay = [];
  pages = [];
  filteredData = [];
  totalCount = 0;
  page = 1;
  currentPage: number;

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
  
    this.filters.valueChanges.subscribe((value) => {
      value.forEach((value) => {
        this.filteredData = this.data.filter((val) => {
            return val[value.field]
            .toLowerCase()
            .includes(value.name.toLowerCase());
        });
      }); 
    });
  }

  calculatePages(totalCount, rows): number[] {
    const totalPages = Math.ceil(totalCount / rows);

    const arr = new Array(totalPages).fill(null).map((_, i) => i + 1);

    return arr;
  }

  calculateData(data: any[], page: number, rows): any[] {
    return data.slice((page - 1) * rows, page * rows);
  }

  goToFirst(): void {
    this.page = 1;
    this.currentPage = this.page;
    this.filteredData = this.calculateData(this.data, this.page, this.rows);
  }

  goToPrev(): void {
    if (this.page <= 1) {
      return;
    } else {
      this.page--;
      this.currentPage = this.page;
      this.filteredData = this.calculateData(this.data, this.page, this.rows);
    }
  }

  next(): void {
    if (this.page >= this.pages.length) {
      return;
    } else {
      this.page++;
      this.currentPage = this.page;
      this.filteredData = this.calculateData(this.data, this.page, this.rows);
    }
  }

  last(): void {
    this.page = this.pages[this.pages.length - 1];
    this.currentPage = this.page;
    this.filteredData = this.calculateData(this.data, this.page, this.rows);
  }

  changePage(page: number): void {
    this.page = page;
    this.currentPage = page;
    this.filteredData = this.calculateData(this.data, this.page, this.rows);
  }

  search(searchTerm: string) {
    this.searchVal.emit(searchTerm);
  }

  sort(field: string):void {
    this.filteredData = this.data.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  }
}
