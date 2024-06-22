import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listarol',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,MatButtonModule],
  templateUrl: './listarol.component.html',
  styleUrl: './listarol.component.css'
})
export class ListarolComponent implements OnInit{
  displayedColumns: string[] = [
    'codigo', 
    'rol',
    'editar',
    'eliminar'];

  dataSource:MatTableDataSource<Rol>=new MatTableDataSource()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  constructor(private rS:RolService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
  deletes(id:number)
  {
    this.rS.delete(id).subscribe((data)=>
    {
      this.rS.list().subscribe((data)=>
      {
        this.rS.setList(data)
      })
    });
  }
}
