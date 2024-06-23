import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TratamientosService } from '../../../services/tratamientos.service';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-reporte-tratamiento01',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-tratamiento01.component.html',
  styleUrl: './reporte-tratamiento01.component.css'
})
export class ReporteTratamiento01Component implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData: ChartDataset<'doughnut'>[] = [
    {
      data: [], // Esto se llenará dinámicamente
      label: 'Tratamientos en Progreso',
      backgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      hoverBackgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      borderWidth: 1,
    }
  ];

  constructor(private tS: TratamientosService) {}

  ngOnInit(): void {
    this.tS.getListTratamientosinProcess().subscribe(data => {
      this.barChartLabels = data.map(item => `${item.nombreTratamientos} - ${item.estadoTratamientos}`);
      this.barChartData[0].data = Array(this.barChartLabels.length).fill(1); // Usar 1 como valor para todos los tratamientos
    });
  }
}
