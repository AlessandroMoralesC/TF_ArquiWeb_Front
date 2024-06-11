import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Component,OnInit,ViewChild } from '@angular/core';
import { Comunidad } from '../../../models/comunidad';
import { ComunidadService } from '../../../services/comunidad.service';

@Component({
  selector: 'app-listarcomunidad',
  standalone: true,
  imports: [MatTableModule,MatFormFieldModule,
    MatPaginatorModule,RouterLink,MatButtonModule],
  templateUrl: './listarcomunidad.component.html',
  styleUrl: './listarcomunidad.component.css'
})
export class ListarcomunidadComponent implements OnInit{
  dataSource: MatTableDataSource<Comunidad> = new MatTableDataSource();
  displayedColumns: string[] = ['IdComunidad', 'experiencias', 'aprobaciones', 'recomendaciones', 'usuario','editar',
    'eliminar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private mS: ComunidadService) {}

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
  deletes(id: number) {
    this.mS.delete(id).subscribe({
      next: () => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
      },
    });
  }
}
