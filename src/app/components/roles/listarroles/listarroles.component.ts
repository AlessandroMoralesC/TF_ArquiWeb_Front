import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../models/roles';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'rol',
    'nombre',
    'apellido',
    'username',
    'editar',
  ];
  dataSource:MatTableDataSource<Role> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:RolesService) {}
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
