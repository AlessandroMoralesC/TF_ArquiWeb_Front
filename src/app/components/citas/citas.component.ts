import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcitasComponent } from './listarcitas/listarcitas.component';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [RouterOutlet,ListarcitasComponent],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
