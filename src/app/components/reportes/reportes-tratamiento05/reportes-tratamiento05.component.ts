import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { CantidadDeMaterialPorTipoDTO } from '../../../models/cantidadDeMaterialporTipo';
import { CantidadDeMaterialporNombreDTO } from '../../../models/cantidadDeMaterialporNombreDTO';

@Component({
  selector: 'app-reportes-tratamiento05',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportes-tratamiento05.component.html',
  styleUrl: './reportes-tratamiento05.component.css'
})
export class ReportesTratamiento05Component implements OnInit {
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

  constructor(private rS: TipomaterialService) {}

  ngOnInit(): void {
    this.rS.getCantidaddeMaterialporTipo().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipotmaterial);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad Tipo Material',
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
