import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HorarioMedico } from '../../../models/horarios';
import { HorariosService } from '../../../services/horarios.service';




@Component({
  selector: 'app-listarhorarios',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarhorarios.component.html',
  styleUrl: './listarhorarios.component.css'
})
export class ListarhorariosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'fecha',
    'estado',
    'nombre',
    'apellido',
    'username',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<HorarioMedico> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:HorariosService) {}
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