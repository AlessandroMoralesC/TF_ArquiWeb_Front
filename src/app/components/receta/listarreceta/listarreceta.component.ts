import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Receta } from '../../../models/receta';
import { RecetaService } from '../../../services/receta.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listarreceta',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarreceta.component.html',
  styleUrl: './listarreceta.component.css'
})
export class ListarrecetaComponent {
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'cantidad',
    'observaciones',
    'editar',
    'eliminar'
  ];

  dataSource: MatTableDataSource<Receta> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private rS:RecetaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data); 
    })
    this.rS.getlist().subscribe((data)=>
    {
      this.dataSource = new MatTableDataSource(data);
    })
  }
  deletes(id:number)
  {
    this.rS.delete(id).subscribe((data)=>
    {
      this.rS.list().subscribe((data)=>
      {
        this.rS.setlist(data)
      })
    });
  }

}
