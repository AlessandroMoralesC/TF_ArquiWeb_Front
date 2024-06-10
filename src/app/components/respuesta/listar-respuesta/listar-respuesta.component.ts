import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-respuesta',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink, MatButtonModule],
  templateUrl: './listar-respuesta.component.html',
  styleUrls: ['./listar-respuesta.component.css']
})
export class ListarRespuestaComponent implements OnInit {
  displayedColumns: string[] = [
    'idRespuesta',
    'pregunta',
    'respuestas',
    'usuario',
    'editar',
    'eliminar'
  ];
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private rS: RespuestaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
