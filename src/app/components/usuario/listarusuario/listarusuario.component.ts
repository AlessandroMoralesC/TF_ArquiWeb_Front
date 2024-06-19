import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario} from '../../../models/usuario';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    RouterLink,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css']
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idUsuario',
    'nombre',
    'apellido',
    'fechanacimiento',
    'telefono',
    'correo',
    'especialidad',
    'username',
    'password',
    'enabled',
    'editar',
    'eliminar'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number) {
    this.uS.eliminar(id).subscribe({
      next: () => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
      },
    });
  }
}