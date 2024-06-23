import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { CantidadDeMaterialPorTipoDTO } from '../../../models/cantidadDeMaterialporTipo';

@Component({
  selector: 'app-reportes-tratamiento05',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportes-tratamiento05.component.html',
  styleUrl: './reportes-tratamiento05.component.css'
})
export class ReportesTratamiento05Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData: ChartDataset<'doughnut'>[] = [
    {
      data: [], // Esto se llenará dinámicamente
      label: 'Tratamientos Efectivos',
      backgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      hoverBackgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      borderWidth: 1,
    }
  ];

  constructor(private tS: TipomaterialService) {}

  ngOnInit(): void {
    this.tS.getCantidaddeMaterialporTipo().subscribe((data:CantidadDeMaterialPorTipoDTO[]) => {
      this.barChartLabels = data.map(item => `${item.tipotmaterial}`);
      this.barChartData[0].data = data.map(item => item.CantidadRegistros); // Usar las cantidades reales
    });
  }

}
