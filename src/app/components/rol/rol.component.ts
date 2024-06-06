import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarolComponent } from './listarol/listarol.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [RouterOutlet,ListarolComponent] ,
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
