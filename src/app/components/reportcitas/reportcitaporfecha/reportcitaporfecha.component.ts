import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CitasService } from '../../../services/citas.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportcitaporfecha',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportcitaporfecha.component.html',
  styleUrl: './reportcitaporfecha.component.css'
})
export class ReportcitaporfechaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  }

  barChartLabels: Date[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: CitasService) { }
  ngOnInit(): void {
    this.cS.getdate().subscribe(data => {
      this.barChartLabels = data.map(item => item.fechaCita)
      this.barChartData = [
        {
          data: data.map(item => item.idCita),
          label: "Cita por Fecha",
          backgroundColor: ['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
      ]
    })
  }
}

