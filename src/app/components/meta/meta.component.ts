import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmetasComponent } from './listarmetas/listarmetas.component';

@Component({
  selector: 'app-meta',
  standalone: true,
  imports: [RouterOutlet,ListarmetasComponent],
  templateUrl: './meta.component.html',
  styleUrl: './meta.component.css'
})
export class MetaComponent {
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
