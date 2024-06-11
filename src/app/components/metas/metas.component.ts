import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmetasComponent } from './listarmetas/listarmetas.component';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [RouterOutlet, ListarmetasComponent],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.css'
})
export class MetasComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
