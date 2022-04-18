import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { TableComponent } from './table-wrapper/table/table.component';

@NgModule({
  declarations: [
    TableComponent, 
    TableWrapperComponent, 
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableComponent,
    TableWrapperComponent
]
})
export class TableModule { }
