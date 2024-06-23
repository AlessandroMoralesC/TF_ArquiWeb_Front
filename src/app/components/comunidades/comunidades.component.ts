import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomunidadesComponent } from './listarcomunidades/listarcomunidades.component';

@Component({
  selector: 'app-comunidades',
  standalone: true,
  imports: [RouterOutlet,ListarcomunidadesComponent],
  templateUrl: './comunidades.component.html',
  styleUrl: './comunidades.component.css'
})
export class ComunidadesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
