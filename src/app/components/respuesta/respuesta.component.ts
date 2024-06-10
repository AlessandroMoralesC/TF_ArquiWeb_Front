import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRespuestaComponent } from './listar-respuesta/listar-respuesta.component';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [RouterOutlet, ListarRespuestaComponent],
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css']
})
export class RespuestaComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
}
