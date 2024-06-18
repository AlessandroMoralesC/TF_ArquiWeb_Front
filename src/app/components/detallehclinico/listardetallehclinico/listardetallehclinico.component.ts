import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetallehclinicoService } from '../../../services/detallehclinico.service';
import { DetalleHClinico } from '../../../models/detallehclinico';


@Component({
  selector: 'app-listardetallehclinico',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './listardetallehclinico.component.html',
  styleUrls: ['./listardetallehclinico.component.css']
})
export class ListardetallehclinicoComponent implements OnInit {
  dataSource: MatTableDataSource<DetalleHClinico> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'fecha',
    'historialClinico',
    'recetas',
    'examenes',
    'tratamientos',
    'acciones'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dHCS: DetallehclinicoService) {}

  ngOnInit(): void {
    this.dHCS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.dHCS.eliminar(id).subscribe(() => {
      this.dHCS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}