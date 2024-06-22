import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrespuestasComponent } from './listarrespuestas/listarrespuestas.component';

@Component({
  selector: 'app-respuestas',
  standalone: true,
  imports: [RouterOutlet,ListarrespuestasComponent],
  templateUrl: './respuestas.component.html',
  styleUrl: './respuestas.component.css'
})
export class RespuestasComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
