import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetalleClinico } from '../../../models/detallesclinicos';
import { DetalleclinicosService } from '../../../services/detalleclinicos.service';



@Component({
  selector: 'app-listardetallesclinicos',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listardetallesclinicos.component.html',
  styleUrl: './listardetallesclinicos.component.css'
})
export class ListardetallesclinicosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'Descripcion',
    'recetas',
    'tratamientos',
    'examenes',
    'nombre',
    'apellido',
    'editar',
  
  ];
  dataSource:MatTableDataSource<DetalleClinico> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:DetalleclinicosService) {}
  ngOnInit(): void {
    this.ts.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.ts.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });
  }

}