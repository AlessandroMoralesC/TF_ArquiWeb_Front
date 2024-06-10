import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarHistorialclinicoComponent } from './listar-historialclinico/listar-historialclinico.component';


@Component({
  selector: 'app-historialclinico',
  standalone: true,
  imports: [RouterOutlet, ListarHistorialclinicoComponent],
  templateUrl: './historialclinico.component.html',
  styleUrls: ['./historialclinico.component.css']
})
export class HistorialclinicoComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
