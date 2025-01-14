import {AfterViewInit, Component, input, OnInit, viewChild} from '@angular/core';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {ExampleSerials, Serial} from '../../models/serial';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-attach-serial-content',
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatLabel,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatSortHeader,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
  ],
  templateUrl: './attach-serial-content.component.html',
  styleUrl: './attach-serial-content.component.scss'
})
export class AttachSerialContentComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Serial> = new MatTableDataSource(ExampleSerials);
  columns: string[] = ['name', "cardQuantity", "createdAt"];

  sort = viewChild.required(MatSort)
  paginator = viewChild.required(MatPaginator)
  ngAfterViewInit() {
    this.dataSource.sort = this.sort()
    this.dataSource.paginator = this.paginator()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(ExampleSerials);
  }
}

