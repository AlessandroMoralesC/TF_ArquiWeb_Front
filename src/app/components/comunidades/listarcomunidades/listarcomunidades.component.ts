import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Comunidad } from '../../../models/comunidades';
import { ComunidadesService } from '../../../services/comunidades.service';


@Component({
  selector: 'app-listarcomunidades',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarcomunidades.component.html',
  styleUrl: './listarcomunidades.component.css'
})
export class ListarcomunidadesComponent implements OnInit{
  displayedColumns: string[] = [
    'Id',
    'Experiencias',
    'Aprobaciones',
    'Recomendaciones',
    'editar',
    'eliminar'

  ];
  dataSource:MatTableDataSource<Comunidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:ComunidadesService) {}
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