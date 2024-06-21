import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Materiales } from '../../../models/materiales';
import { MaterialesService } from '../../../services/materiales.service';
import { Meta } from '../../../models/meta';
import { MetaService } from '../../../services/meta.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-listarmetas',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarmetas.component.html',
  styleUrl: './listarmetas.component.css'
})
export class ListarmetasComponent implements OnInit{
  displayedColumns: string[] = ['idMeta', 'estadoMeta', 'nombreMeta', 'descripcionMeta', 'usuario', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Meta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private metaService: MetaService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.metaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deletes(id: number): void {
    this.metaService.eliminar(id).subscribe(() => {
      this.metaService.list().subscribe(data => {
        this.metaService.setList(data);
      });
    });
  }
}
