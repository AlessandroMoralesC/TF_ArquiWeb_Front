import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TratamientosService } from '../../../services/tratamientos.service';
import { BaseChartDirective } from 'ng2-charts';
import { CantidadDeTratamientoPorEfectividadDTO } from '../../../models/cantidadDeTratamientoPorEfectividadDTO';

@Component({
  selector: 'app-reporte-tratamiento02',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-tratamiento02.component.html',
  styleUrl: './reporte-tratamiento02.component.css'
})
export class ReporteTratamiento02Component implements OnInit {
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

  constructor(private tS: TratamientosService) {}

  ngOnInit(): void {
    this.tS.getCantidadDeTratamientoPorEfectividad().subscribe((data:CantidadDeTratamientoPorEfectividadDTO[]) => {
      this.barChartLabels = data.map(item => `${item.nombreTratamientos} - ${item.efectividadTratamientos}`);
      this.barChartData[0].data = data.map(item => item.cantidadDeTratamientoEfectivas); // Usar las cantidades reales
    });
  }

}
