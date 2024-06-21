import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Historialclinico } from '../../../models/historialclinico';
import { HistorialclinicoService } from '../../../services/historialclinico.service';

@Component({
  selector: 'app-listarhistorialclinico',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarhistorialclinico.component.html',
  styleUrl: './listarhistorialclinico.component.css'
})
export class ListarhistorialclinicoComponent implements OnInit{
  displayedColumns: string[] = ['idHClinico', 'fechaperturaHClinico', 'usuario', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Historialclinico> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private hclinicoService: HistorialclinicoService) {}

  ngOnInit(): void {
    this.hclinicoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.hclinicoService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deletes(id: number): void {
    this.hclinicoService.eliminar(id).subscribe(() => {
      this.hclinicoService.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
