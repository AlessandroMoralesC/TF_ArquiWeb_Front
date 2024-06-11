import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-listar-cita',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatButtonModule],
  templateUrl: './listar-cita.component.html',
  styleUrl: './listar-cita.component.css'
})
export class ListarCitaComponent implements OnInit {
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idcita',
    'fechacita',
    'motivocita',
    'horacita',
    'usuarioid',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CitaService) { }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
