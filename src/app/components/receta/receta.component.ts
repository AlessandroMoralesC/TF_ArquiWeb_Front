import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecetaComponent } from './listarreceta/listarreceta.component';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [RouterOutlet,ListarrecetaComponent],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
