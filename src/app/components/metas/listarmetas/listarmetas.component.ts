import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Meta } from '../../../models/metas';
import { MetasService } from '../../../services/metas.service';


@Component({
  selector: 'app-listarmetas',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarmetas.component.html',
  styleUrl: './listarmetas.component.css'
})
export class ListarmetasComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nombreme',
    'estado',
    'nombre',
    'apellido',
    'username',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<Meta> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:MetasService) {}
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