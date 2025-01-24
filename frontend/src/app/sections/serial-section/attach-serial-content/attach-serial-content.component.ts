import {AfterViewInit, Component, inject, input, OnInit, viewChild} from '@angular/core';
import {MatFormField, MatHint, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {Serial} from '../../../core/models/serial';
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
import { RectanglebuttonComponent } from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import {SerialService} from '../../../core/services/serial.service';
import {GameService} from '../../../core/services/game.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../../shared/dialogs/confir-dialog/confir-dialog.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateSerialDialogComponent} from '../create-serial-dialog/create-serial-dialog.component';

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
    RectanglebuttonComponent,
    MatHint,
    ReactiveFormsModule
  ],
  templateUrl: './attach-serial-content.component.html',
  styleUrl: './attach-serial-content.component.scss'
})
export class AttachSerialContentComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Serial> = new MatTableDataSource();
  useToGenerate = input<boolean>(false);
  columns: string[] = ['serialName', "cardQuantity", "creationDate"];
  serialService = inject(SerialService)
  gameService = inject(GameService)
  selectedSerial?: Serial
  ableToAttach = true
  readonly dialog = inject(MatDialog);
  sort = viewChild.required<MatSort>(MatSort)
  paginator = viewChild.required<MatPaginator>(MatPaginator)
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
    this.serialService.getSerials().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort()
        this.dataSource.paginator = this.paginator()
      }
    })
  }
  attachSerialToActualGame(serial?: Serial) {
    if(serial) {
      this.dialog.open(ConfirDialogComponent, {
        data: false,
      }).afterClosed().subscribe(result => {
        if (result == true){
          this.gameService.attachSerialToActualGame(serial);
          this.ableToAttach = false;
        }
      })
    }
  }
  createSerial() {
    this.dialog.open(CreateSerialDialogComponent, {
      data: {
        cardNumber: 0,
        serialName: ''
      }
    }).afterClosed().subscribe(result => {
      if (result){
        this.serialService.createSerial(
            result).subscribe({
          next: (result) => {
            if (result) {
              this.serialService.getSerials().subscribe({
                next: data => {
                  this.dataSource = new MatTableDataSource(data);
                  this.dataSource.sort = this.sort()
                  this.dataSource.paginator = this.paginator()
                }
              })
            }
          }
        })
      }
    })


  }
}

