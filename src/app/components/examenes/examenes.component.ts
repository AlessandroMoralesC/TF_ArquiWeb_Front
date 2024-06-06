import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarExamenesComponent } from './listar-examenes/listar-examenes.component';

@Component({
  selector: 'app-examenes',
  standalone: true,
  imports: [RouterOutlet, ListarExamenesComponent],
  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.css'
})
export class ExamenesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
