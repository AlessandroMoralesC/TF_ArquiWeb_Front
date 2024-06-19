import { Component, OnInit } from '@angular/core';
import { ListarusersComponent } from './listarusers/listarusers.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet,ListarusersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
