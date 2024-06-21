import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Historialclinico } from '../../../models/historialclinico';
import { HistorialclinicoService } from '../../../services/historialclinico.service';
import { DetalleHClinico } from '../../../models/detallehclinico';
import { DetallehclinicoService } from '../../../services/detallehclinico.service';

@Component({
  selector: 'app-listardetallehclinico',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listardetallehclinico.component.html',
  styleUrl: './listardetallehclinico.component.css'
})
export class ListardetallehclinicoComponent {
  displayedColumns: string[] = ['idDHClinico', 'descripcionDHClinico', 'fechaDHClinico', 'historialClinico', 'recetas', 'examenes', 'tratamientos', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<DetalleHClinico> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private detalleHistorialClinicoService: DetallehclinicoService) {}

  ngOnInit(): void {
    this.detalleHistorialClinicoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deletes(id: number): void {
    this.detalleHistorialClinicoService.eliminar(id).subscribe(() => {
      this.detalleHistorialClinicoService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
