import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTratamientoComponent } from './listar-tratamiento/listar-tratamiento.component';


@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [RouterOutlet, ListarTratamientoComponent],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css'
})
export class TratamientosComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
