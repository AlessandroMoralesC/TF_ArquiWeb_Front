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
export class ReportesTratamiento06Component implements OnInit {
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
      data: [],
      label: 'Cantidad de Material',
      backgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      borderWidth: 1,
    }
  ];

  constructor(private tS: TipomaterialService) {}

  ngOnInit(): void {
    this.tS.getCantidaddeMaterialporTipo().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.barChartLabels = data.map(item => `${item.tipotmaterial} - ${item.CantidadRegistros}`);
        this.barChartData[0].data = data.map(item => item.CantidadRegistros); // Usar los valores de CantidadRegistros
      }
    });
  }
}