import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportcitaporfechaComponent } from './reportcitaporfecha/reportcitaporfecha.component';

@Component({
  selector: 'app-reportcitas',
  standalone: true,
  imports: [RouterOutlet, ReportcitaporfechaComponent],
  templateUrl: './reportcitas.component.html',
  styleUrl: './reportcitas.component.css'
})
export class ReportcitasComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
    
  }
}

