import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCitaComponent } from './listar-cita/listar-cita.component';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [RouterOutlet,ListarCitaComponent],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
///
