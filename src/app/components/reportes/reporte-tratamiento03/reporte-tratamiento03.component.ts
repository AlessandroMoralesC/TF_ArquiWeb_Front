import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MetasService } from '../../../services/metas.service';
import { BaseChartDirective } from 'ng2-charts';
import { CantidadMetasPorUsuario } from '../../../models/cantidadMetasPorUsuario';

@Component({
  selector: 'app-reporte-tratamiento03',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-tratamiento03.component.html',
  styleUrl: './reporte-tratamiento03.component.css'
})
export class ReporteTratamiento03Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: MetasService) {}

  ngOnInit(): void {
    this.rS.getCantidadMetasPorUsuario().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.usuario);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad Meta',
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
    });
  }
}
