import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Materiales } from '../../../models/materiales';
import { MaterialesService } from '../../../services/materiales.service';

@Component({
  selector: 'app-listarmateriales',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './listarmateriales.component.html',
  styleUrl: './listarmateriales.component.css'
})
export class ListarmaterialesComponent implements OnInit{
  dataSource: MatTableDataSource<Materiales> = new MatTableDataSource();

  displayedColumns: string[] = [
    'idMateriales',
    'nombreMateriales',
    'usuario',
    'tipomaterial',
    'accion01',
    'accion02',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: MaterialesService) {}
  
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.mS.eliminar(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }


}
