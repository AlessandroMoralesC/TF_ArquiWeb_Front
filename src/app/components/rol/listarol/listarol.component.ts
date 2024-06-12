import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listarol',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule],
  templateUrl: './listarol.component.html',
  styleUrl: './listarol.component.css'
})
export class ListarolComponent implements OnInit{
   dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['idRol', 'nombreRol', 'usuario'];

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.rolService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
