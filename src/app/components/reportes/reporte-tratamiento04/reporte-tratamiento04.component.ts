import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { CantidadDeMaterialporNombreDTO } from '../../../models/cantidadDeMaterialporNombreDTO';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte-tratamiento04',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-tratamiento04.component.html',
  styleUrl: './reporte-tratamiento04.component.css'
})
export class ReporteTratamiento04Component implements OnInit{
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
      label: 'Cantidad de Material por Nombre',
      backgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      hoverBackgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      borderWidth: 1,
    }
  ];

  constructor(private TmaterialService: TipomaterialService) { }

  ngOnInit(): void {
    this.TmaterialService.getCantidadDeMaterialporNombre().subscribe((data: CantidadDeMaterialporNombreDTO[]) => {
      this.barChartLabels = data.map(item => item.tematmaterial);
      this.barChartData[0].data = data.map(item => item.CantidadRegistrosTema);
    });
  }
}
