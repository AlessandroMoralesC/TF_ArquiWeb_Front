import { Component, OnInit } from '@angular/core';
import { ListarTipomaterialComponent } from './listar-tipomaterial/listar-tipomaterial.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-tipomaterial',
  standalone: true,
  imports: [RouterOutlet, ListarTipomaterialComponent],
  templateUrl: './tipomaterial.component.html',
  styleUrl: './tipomaterial.component.css'
})
export class TipomaterialComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
