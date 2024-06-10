import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { historialclinico } from '../../../models/historialclinico';
import { HistorialclinicoService } from '../../../services/historialclinico';

@Component({
  selector: 'app-listar-historialclinico',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink, MatButtonModule],
  templateUrl: './listar-historialclinico.component.html',
  styleUrls: ['./listar-historialclinico.component.css']
})
export class ListarHistorialclinicoComponent implements OnInit {
  displayedColumns: string[] = [
    'idHClinico',
    'fechaperturaHClinico',
    'usuario',
    'editar',
    'eliminar'
  ];
  dataSource: MatTableDataSource<historialclinico> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private hS: HistorialclinicoService) {}

  ngOnInit(): void {
    this.hS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.hS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number) {
    this.hS.delete(id).subscribe(() => {
      this.hS.list().subscribe((data) => {
        this.hS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
