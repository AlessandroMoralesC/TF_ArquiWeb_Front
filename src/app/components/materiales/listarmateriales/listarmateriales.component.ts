import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Materiales } from '../../../models/materiales';
import { MaterialesService } from '../../../services/materiales.service';

@Component({
  selector: 'app-listarmateriales',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarmateriales.component.html',
  styleUrl: './listarmateriales.component.css'
})
export class ListarmaterialesComponent implements OnInit {
  displayedColumns: string[] = ['idMateriales', 'nombreMateriales', 'usuario', 'tipomaterial', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Materiales> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ts: MaterialesService) {}

  ngOnInit(): void {
    this.ts.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.ts.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deletes(id: number): void {
    this.ts.eliminar(id).subscribe(() => {
      this.ts.list().subscribe((data) => {
        this.ts.setList(data);
      });
    });
  }
}
