import { Component, OnInit } from '@angular/core';
import { ListarrolesComponent } from './listarroles/listarroles.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterOutlet,ListarrolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
