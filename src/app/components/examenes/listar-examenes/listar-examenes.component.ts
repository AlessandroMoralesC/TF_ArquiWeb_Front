import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Examenes } from '../../../models/examenes';
import { ExamenesService } from '../../../services/examenes.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listar-examenes',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listar-examenes.component.html',
  styleUrl: './listar-examenes.component.css'
})
export class ListarExamenesComponent implements OnInit{
  displayedColumns: string[] = [
    'idexamenes',
    'nombreexamenes',
    'fechaexamenes',
    'resultadosexamenes',
    'observacionesexamenes',
    'editar',
    'eliminar'
  ];
  dataSource:MatTableDataSource<Examenes> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private mS:ExamenesService) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });
  }
  deletes(id:number)
  {
    this.mS.delete(id).subscribe((data)=>
    {
      this.mS.list().subscribe((data)=>
      {
        this.mS.setList(data)
      })
    });
  }
}
