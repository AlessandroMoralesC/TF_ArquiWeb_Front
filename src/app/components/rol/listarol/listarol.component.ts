import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listarol',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule],
  templateUrl: './listarol.component.html',
  styleUrl: './listarol.component.css'
})
export class ListarolComponent implements OnInit{
  displayedColumns: string[] = ['codigo', 'rol', 'editar', 'eliminar', 'seleccionarUsuario'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource<Rol>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RolService, private router: Router) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Rol>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number): void {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource<Rol>(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  seleccionarUsuario(idRol: number): void {
    // Redirigir al componente de selección de usuario, pasando el idRol como parámetro
    this.router.navigate(['/seleccionar-usuario', idRol]);
  }
}
