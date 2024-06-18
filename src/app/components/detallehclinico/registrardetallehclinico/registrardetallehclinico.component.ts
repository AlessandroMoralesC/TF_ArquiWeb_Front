import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetalleHClinico } from '../../../models/detallehclinico';
import { DetallehclinicoService } from '../../../services/detallehclinico.service';
import { HistorialclinicoService } from '../../../services/historialclinico';
import { RecetaService } from '../../../services/receta.service';
import { ExamenesService } from '../../../services/examenes.service';
import { TratamientosService } from '../../../services/tratamientos.service';

@Component({
  selector: 'app-registrardetallehclinico',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './registrardetallehclinico.component.html',
  styleUrl: './registrardetallehclinico.component.css'
})
export class RegistrardetallehclinicoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  detalleHClinico: DetalleHClinico = new DetalleHClinico();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  historialesClinicos: any[] = [];
  recetas: any[] = [];
  examenes: any[] = [];
  tratamientos: any[] = [];

  constructor(
    private dHCS: DetallehclinicoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private historialClinicoService: HistorialclinicoService,
    private recetaService: RecetaService,
    private examenService: ExamenesService,
    private tratamientoService: TratamientosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      historialClinico: ['', Validators.required],
      recetas: ['', Validators.required],
      examenes: ['', Validators.required],
      tratamientos: ['', Validators.required]
    });

    this.historialClinicoService.list().subscribe(data => {
      this.historialesClinicos = data;
    });

    this.recetaService.list().subscribe(data => {
      this.recetas = data;
    });

    this.examenService.list().subscribe(data => {
      this.examenes = data;
    });

    this.tratamientoService.list().subscribe(data => {
      this.tratamientos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.detalleHClinico.idDHClinico = this.form.value.codigo;
      this.detalleHClinico.descripcionDHClinico = this.form.value.descripcion;
      this.detalleHClinico.fechaDHClinico = this.form.value.fecha;
      this.detalleHClinico.historialClinico.idHClinico = this.form.value.historialClinico;
      this.detalleHClinico.recetas.idRecetas = this.form.value.recetas;
      this.detalleHClinico.examenes.idExamenes = this.form.value.examenes;
      this.detalleHClinico.tratamientos.idTratamientos = this.form.value.tratamientos;

      if (this.edicion) {
        this.dHCS.update(this.detalleHClinico).subscribe(() => {
          this.dHCS.list().subscribe(data => {
            this.dHCS.setList(data);
          });
        });
      } else {
        this.dHCS.insert(this.detalleHClinico).subscribe(data => {
          this.dHCS.list().subscribe(data => {
            this.dHCS.setList(data);
          });
        });
      }
      this.router.navigate(['detallehclinico']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.dHCS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDHClinico),
          descripcion: new FormControl(data.descripcionDHClinico),
          fecha: new FormControl(data.fechaDHClinico),
          historialClinico: new FormControl(data.historialClinico.idHClinico),
          recetas: new FormControl(data.recetas.idRecetas),
          examenes: new FormControl(data.examenes.idExamenes),
          tratamientos: new FormControl(data.tratamientos.idTratamientos)
        });
      });
    }
  }
}
