import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HorarioService } from '../../../services/horario.service';
import { HorarioMedico } from '../../../models/horario';

@Component({
  selector: 'app-listar-horario',
  standalone: true,
  imports: [MatTableModule,MatPaginator,MatButtonModule],
  templateUrl: './listar-horario.component.html',
  styleUrl: './listar-horario.component.css'
})
export class ListarHorarioComponent implements OnInit{
  dataSource: MatTableDataSource<HorarioMedico> = new MatTableDataSource();
  displayedColumns: string[] = [
  'codigo',
  'fecha',
  'estado',
  'codigocita',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private hS:HorarioService) {}

  ngOnInit(): void {
    this.hS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;

    })
    this.hS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); 
      this.dataSource.paginator = this.paginator;
     
    });
  }
}

