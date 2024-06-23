import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Historialclinico } from '../../../models/historialclinicos';
import { HistorialclinicosService } from '../../../services/historialclinicos.service';


@Component({
  selector: 'app-listarhistorialclinicos',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarhistorialclinicos.component.html',
  styleUrl: './listarhistorialclinicos.component.css'
})
export class ListarhistorialclinicosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'fecha',
    'nombre',
    'apellido',
    'username',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<Historialclinico> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:HistorialclinicosService) {}
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