import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { TipoMaterial } from '../../../models/tipomaterial';
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-tipomaterial',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listar-tipomaterial.component.html',
  styleUrl: './listar-tipomaterial.component.css'
})
export class ListarTipomaterialComponent implements OnInit{
  displayedColumns: string[] = [
    'idtipomaterial',
    'tematipomaterial',
    'tipotipomaterial',
    'linktipomaterial',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<TipoMaterial> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private ts:TipomaterialService) {}
  ngOnInit(): void {
    this.ts.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.ts.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });
  }
  deletes(id:number)
  {
    this.ts.delete(id).subscribe((data)=>
    {
      this.ts.list().subscribe((data)=>
      {
        this.ts.setList(data)
      })
    });
  }
}
