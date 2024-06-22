import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Tratamientos } from '../../../models/tratamientos';
import { TratamientosService } from '../../../services/tratamientos.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-tratamiento',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listar-tratamiento.component.html',
  styleUrl: './listar-tratamiento.component.css'
})
export class ListarTratamientoComponent implements OnInit{
  displayedColumns: string[] = [
    'idtratamientos',
    'nombretratamientos',
    'fechadeinciotratamientos',
    'fechadefintratamientos',
    'estadotratamientos',
    'descripciontratamientos',
    'efectividadtratamientos',
    'editar',
    'eliminar'

  ];
  dataSource:MatTableDataSource<Tratamientos> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private mS:TratamientosService) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });
  }
  eliminar(id: number) {
    this.mS.eliminar(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
}
