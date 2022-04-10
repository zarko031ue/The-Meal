import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/pages/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TableComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
  ],
  exports: [
    TableComponent
]
})
export class TableModule { }
