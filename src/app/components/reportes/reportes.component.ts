import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReporteTratamiento01Component } from './reporte-tratamiento01/reporte-tratamiento01.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet,ReporteTratamiento01Component],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
