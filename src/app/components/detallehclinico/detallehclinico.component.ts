import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetallehclinicoComponent } from './listardetallehclinico/listardetallehclinico.component';

@Component({
  selector: 'app-detallehclinico',
  standalone: true,
  imports: [RouterOutlet,ListardetallehclinicoComponent],
  templateUrl: './detallehclinico.component.html',
  styleUrl: './detallehclinico.component.css'
})
export class DetallehclinicoComponent {
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
