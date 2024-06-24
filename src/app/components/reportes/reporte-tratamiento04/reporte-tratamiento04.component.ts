import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MetasService } from '../../../services/metas.service';
import { BaseChartDirective } from 'ng2-charts';
import { CantidadMetasPorUsuario } from '../../../models/cantidadMetasPorUsuario';
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { CantidadDeMaterialporNombreDTO } from '../../../models/cantidadDeMaterialporNombreDTO';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte-tratamiento04',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-tratamiento04.component.html',
  styleUrl: './reporte-tratamiento04.component.css'
})
export class ReporteTratamiento04Component implements OnInit {
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
    this.rS.getCantidadDeMaterialporNombre().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tematmaterial);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad Tipo Material por Nombre',
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
