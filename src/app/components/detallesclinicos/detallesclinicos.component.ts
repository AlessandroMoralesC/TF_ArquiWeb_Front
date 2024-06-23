import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetallesclinicosComponent } from './listardetallesclinicos/listardetallesclinicos.component';

@Component({
  selector: 'app-detallesclinicos',
  standalone: true,
  imports: [RouterOutlet,ListardetallesclinicosComponent],
  templateUrl: './detallesclinicos.component.html',
  styleUrl: './detallesclinicos.component.css'
})
export class DetallesclinicosComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
