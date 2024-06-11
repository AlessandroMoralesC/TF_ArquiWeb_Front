import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HorarioService } from '../../../services/horario.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { HorarioMedico } from '../../../models/horario';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-registrar-horario',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule,
    CommonModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './registrar-horario.component.html',
  styleUrl: './registrar-horario.component.css'
})
export class RegistrarHorarioComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  horario: HorarioMedico = new HorarioMedico();
  listaCitas: Cita[] = []

  constructor(
    private fomrBuilder: FormBuilder,
    private hS: HorarioService,
    private router: Router,
    private cS: CitaService
  ) { }

  ngOnInit(): void {
    this.form = this.fomrBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      estado: ['', Validators.required],
      codigocita: ['', Validators.required],
    });
    this.cS.list().subscribe((data) => {
      this.listaCitas = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.horario.idHorario = this.form.value.codigo;
      this.horario.fechaHorario = this.form.value.fecha;
      this.horario.estadoHorario = this.form.value.estado;
      this.horario.idCita = this.form.value.codigocita;

      const citsID = this.form.value.codigocita;
      const selectCita = this.listaCitas.find(cit => cit.idCita === citsID);

      if (selectCita) {
        this.horario.idCita = selectCita;

        this.hS.insert(this.horario).subscribe((data) => {
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });

        this.router.navigate(['horariomedico/nuevo']);
      } else {
        console.error('No se encontró la cita seleccionado.');
      }
    }
  }
}

///
