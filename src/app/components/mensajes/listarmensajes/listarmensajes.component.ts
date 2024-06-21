import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MensajesService } from '../../../services/mensajes.service';
import { CommonModule } from '@angular/common';
import { Mensajes } from '../../../models/mensaje';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-listarmensajes',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './listarmensajes.component.html',
  styleUrls: ['./listarmensajes.component.css']
})
export class ListarmensajesComponent implements OnInit {
  displayedColumns: string[] = ['idMensaje', 'mensaje', 'usuario', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Mensajes> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.mensajesService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mensajesService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number): void {
    this.mensajesService.eliminar(id).subscribe(() => {
      this.mensajesService.list().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }
}