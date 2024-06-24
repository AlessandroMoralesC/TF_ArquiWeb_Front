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
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: TipomaterialService) {}

  ngOnInit(): void {
    this.rS.getlistamaterial().subscribe((data) => {
      this.barChartLabels = data.map((item: any) => item.tipotmaterial);
      this.barChartData = [
        {
          data: data.map((item: any) => item.cantidad),
          label: 'Lista Tipo Material',
          backgroundColor: [
            '#0094d3',
            '#4169c7',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    }, (error) => {
      console.error('Error al obtener los datos', error);
    });
  }
}
