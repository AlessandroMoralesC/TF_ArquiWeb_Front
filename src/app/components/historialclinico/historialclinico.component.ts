import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarhistorialclinicoComponent } from './listarhistorialclinico/listarhistorialclinico.component';

@Component({
  selector: 'app-historialclinico',
  standalone: true,
  imports: [RouterOutlet,ListarhistorialclinicoComponent],
  templateUrl: './historialclinico.component.html',
  styleUrl: './historialclinico.component.css'
})
export class HistorialclinicoComponent {
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
