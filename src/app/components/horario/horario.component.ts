import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarHorarioComponent } from './listar-horario/listar-horario.component';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [RouterOutlet,ListarHorarioComponent],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}

