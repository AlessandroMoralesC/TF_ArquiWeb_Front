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
export class ReporteTratamiento03Component implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    {
      data: [], // Esto se llenará dinámicamente
      label: 'Cantidad de Metas por Usuario',
      backgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      hoverBackgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      borderWidth: 1,
    }
  ];

  constructor(private mS: MetasService) {}

  ngOnInit(): void {
    this.mS.getCantidadMetasPorUsuario().subscribe((data: CantidadMetasPorUsuario[]) => {
      this.barChartLabels = data.map(item => item.Usuario);
      this.barChartData[0].data = data.map(item => item.CantidadMetas); // Asignación correcta de datos
    });
  }
}
