import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TipomaterialService } from '../../../services/tipomaterial.service';

@Component({
  selector: 'app-reportes-tratamiento06',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportes-tratamiento06.component.html',
  styleUrl: './reportes-tratamiento06.component.css'
})
export class ReportesTratamiento06Component implements OnInit{
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

  constructor(private tS: TipomaterialService) {}

  ngOnInit(): void {
    this.tS.getlistadovideos().subscribe(data => {
      this.barChartLabels = data.map(item => `${item.linkTMaterial} - ${item.tipoTMaterial}`);
      this.barChartData[0].data = Array(this.barChartLabels.length).fill(1); // Usar 1 como valor para todos los tratamientos
    });
  }
}
