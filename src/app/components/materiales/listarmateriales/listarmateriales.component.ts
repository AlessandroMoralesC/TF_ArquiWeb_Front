import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Materiales } from '../../../models/materiales';
import { MaterialesService } from '../../../services/materiales.service';



@Component({
  selector: 'app-listarmateriales',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarmateriales.component.html',
  styleUrl: './listarmateriales.component.css'
})
export class ListarmaterialesComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nombrema',
    'nombre',
    'apellido',
    'username',
    'tema',
    'tipo',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<Materiales> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:MaterialesService) {}
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