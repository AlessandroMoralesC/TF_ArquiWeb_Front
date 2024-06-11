import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Component,OnInit,ViewChild } from '@angular/core';
import { Meta } from '../../../models/metas';
import { MetasService } from '../../../services/metas.service';

@Component({
  selector: 'app-listarmetas',
  standalone: true,
  imports: [MatTableModule,MatFormFieldModule,
    MatPaginatorModule,RouterLink,MatButtonModule],
  templateUrl: './listarmetas.component.html',
  styleUrl: './listarmetas.component.css'
})
export class ListarmetasComponent implements OnInit {
  dataSource: MatTableDataSource<Meta> = new MatTableDataSource();
  displayedColumns: string[] = ['idMeta', 'estado', 'nombre', 'descripcion', 'usuario','editar',
    'eliminar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private mS: MetasService) {}

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
