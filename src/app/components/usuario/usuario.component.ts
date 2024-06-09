import { Component, OnInit } from '@angular/core';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ListarusuarioComponent,RouterOutlet],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
