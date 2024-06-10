import { Component,OnInit,ViewChild } from '@angular/core';
import { Mensajes } from '../../../models/mensajes';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MensajesService } from '../../../services/mensajes.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarmensajes',
  standalone: true,
  imports: [MatTableModule,MatFormFieldModule,
    MatPaginatorModule,RouterLink,MatButtonModule],
  templateUrl: './listarmensajes.component.html',
  styleUrl: './listarmensajes.component.css'
})
export class ListarmensajesComponent implements OnInit {
  dataSource: MatTableDataSource<Mensajes> = new MatTableDataSource();
  displayedColumns: string[] = ['idMensaje', 'mensaje', 'usuario','editar',
    'eliminar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private mS: MensajesService) {}

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
