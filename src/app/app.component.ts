import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MycrudComponent} from './mycrud/mycrud.component'
import { ServiceService } from './shared/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ucrud';
  displayedColumns: string[] = ['firstName', 'lastName', 'email','dob','gender','education','company','experiance','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit():void {
    this.getEmployeeList()
  }
  constructor(private dialog:MatDialog, private service:ServiceService) {}

    openAddEditEmpForm() {
     const dialogref = this.dialog.open(MycrudComponent)
     dialogref.afterClosed().subscribe( {
      next:(val) => {
        if (val) {
          this.getEmployeeList()
        }
      }
     })

  }

  editEmpForm(data:any) {
    const dialogref = this.dialog.open(MycrudComponent, {
      data
    })
    dialogref.afterClosed().subscribe( {
      next:(val) => {
        if (val) {
          this.getEmployeeList()
        }
      }
     })
  }
  getEmployeeList() {
    this.service.getAllEmployee().subscribe({
      next: (res)=> {
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error:(err)=> {
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id:number) {
    this.service.deleteEmployee(id).subscribe({
      next:(res) => {
        alert("Confirm delete")
        this.getEmployeeList();  //for auto refresh data
      },
      error: console.log,
    })
  }


  
}
