import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarhistorialclinicosComponent } from './listarhistorialclinicos/listarhistorialclinicos.component';

@Component({
  selector: 'app-historialclinicos',
  standalone: true,
  imports: [RouterOutlet,ListarhistorialclinicosComponent],
  templateUrl: './historialclinicos.component.html',
  styleUrl: './historialclinicos.component.css'
})
export class HistorialclinicosComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
