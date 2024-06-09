import { Component,OnInit,ViewChild } from '@angular/core';
import { Mensajes } from '../../../models/mensajes';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MensajesService } from '../../../services/mensajes.service';

@Component({
  selector: 'app-listarmensajes',
  standalone: true,
  imports: [MatTableModule,MatFormFieldModule,
    MatPaginatorModule],
  templateUrl: './listarmensajes.component.html',
  styleUrl: './listarmensajes.component.css'
})
export class ListarmensajesComponent implements OnInit {
  dataSource: MatTableDataSource<Mensajes> = new MatTableDataSource();
  displayedColumns: string[] = ['idMensaje', 'mensaje', 'usuario'];

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
}
