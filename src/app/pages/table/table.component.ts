import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TableColumn } from 'src/app/models/column.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn[];
  @Input() gridData = [];
  @Input() filteredData = [];

  itemsPerPage = 5;
  page = 0;

  pageData = {} as {
    start: number;
    end: number;
  };

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
    this.initPagination();
    this.savePages(0, 5);
  }

  search(searchTerm: string) {
    this.manuService.search.next(searchTerm);
  }

  private initPagination() {
    this.paginate(this.page, this.itemsPerPage);
  }

  // Number of elements in array
  public get size(): number {
    return this.gridData.length; //35
  }
  // Number of pages
  public get totalPages(): number {
    return Math.ceil(this.size / this.itemsPerPage); // 35 / 5 = 7
  }
  // paginate first initialize page with array of elements from 0-4
  private paginate(page: number, itemsPerPage: number): void {
    let startNumber = page * itemsPerPage;
    let endNumber = startNumber + itemsPerPage;

  // This doesn't allow the end number of pagination to be greater than whole size of array, and the starting number will always be 5 less than the end number
    if (endNumber > this.size) {
      endNumber = this.size;
      startNumber = endNumber - itemsPerPage;
    }

    this.savePages(startNumber, endNumber);

    this.filteredData = [...this.gridData.slice(startNumber, endNumber)];
    }

  private savePages(start: number, end: number) {
    this.pageData = {
      ...this.pageData,
      start,
      end,
    };
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.paginate(this.page, this.itemsPerPage);
    }
  }

  next() {
    if (this.page < this.totalPages && this.pageData.end < this.size) {
      this.page++;
      this.paginate(this.page, this.itemsPerPage);
    }
  }

  sort() {
    this.filteredData.reverse();
  }
}
