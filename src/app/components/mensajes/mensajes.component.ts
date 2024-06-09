import { Component, OnInit } from '@angular/core';
import { ListarmensajesComponent } from './listarmensajes/listarmensajes.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [ListarmensajesComponent,RouterOutlet],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
