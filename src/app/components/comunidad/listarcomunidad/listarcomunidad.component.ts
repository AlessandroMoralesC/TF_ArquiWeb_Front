import { Comunidad } from '../../../models/comunidad';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ComunidadService } from '../../../services/comunidad.service';

@Component({
  selector: 'app-listarcomunidad',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarcomunidad.component.html',
  styleUrl: './listarcomunidad.component.css'
})
export class ListarcomunidadComponent {
  displayedColumns: string[] = ['idComunidad', 'experienciasComunidad', 'aprobacionesComunidad', 'recomendacionesComunidad', 'usuario', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Comunidad> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private comunidadService: ComunidadService) {}

  ngOnInit(): void {
    this.comunidadService.list().subscribe((data: Comunidad[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number): void {
    this.comunidadService.eliminar(id).subscribe(() => {
      this.comunidadService.list().subscribe((data: Comunidad[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
