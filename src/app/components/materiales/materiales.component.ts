import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmaterialesComponent } from './listarmateriales/listarmateriales.component';

@Component({
  selector: 'app-materiales',
  standalone: true,
  imports: [RouterOutlet,ListarmaterialesComponent],
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.css'
})
export class MaterialesComponent {
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
