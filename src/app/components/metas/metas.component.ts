import { Component,OnInit } from '@angular/core';
import { ListarmetasComponent } from './listarmetas/listarmetas.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [RouterOutlet,ListarmetasComponent],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.css'
})
export class MetasComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
