import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';



@Component({
  selector: 'app-listarusers',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'username',
    'correo',
    'especialidad',
    'enabled',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<Users> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:UsersService) {}
  ngOnInit(): void {
    this.ts.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.ts.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });
  }
  deletes(id:number)
  {
    this.ts.delete(id).subscribe((data)=>
    {
      this.ts.list().subscribe((data)=>
      {
        this.ts.setList(data)
      })
    });
  }
}
