import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomunidadComponent } from './listarcomunidad/listarcomunidad.component';

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [RouterOutlet,ListarcomunidadComponent],
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
