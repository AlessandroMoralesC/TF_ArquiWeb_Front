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
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData: ChartDataset<'doughnut'>[] = [
    {
      data: [], // Se llenará dinámicamente
      label: 'Cantidad de Material por Nombre',
      backgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      hoverBackgroundColor: ['#8064A2', '#48ACC6', '#4F81BC'],
      borderWidth: 1,
    }
  ];

  constructor(private tMService: TipomaterialService) {} // Ajusta el servicio según sea necesario

  ngOnInit(): void {
    this.tMService.getCantidadDeMaterialporNombre().subscribe((data: CantidadDeMaterialporNombreDTO[]) => {
      this.barChartLabels = data.map(item => item.tematmaterial);
      this.barChartData[0].data = data.map(item => item.CantidadRegistrosTema);
    });
  }
  }