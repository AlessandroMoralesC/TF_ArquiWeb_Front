import { UsersService } from './../../../services/users.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Users } from '../../../models/users';
import { Historialclinico } from '../../../models/historialclinico';
import { HistorialclinicoService } from '../../../services/historialclinico.service';
import { DetalleHClinico } from '../../../models/detallehclinico';
import { Receta } from '../../../models/receta';
import { Examenes } from '../../../models/examenes';
import { Tratamientos } from '../../../models/tratamientos';
import { DetallehclinicoService } from '../../../services/detallehclinico.service';
import { RecetaService } from '../../../services/receta.service';
import { ExamenesService } from '../../../services/examenes.service';
import { TratamientosService } from '../../../services/tratamientos.service';

@Component({
  selector: 'app-registrardetallehclinico',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './registrardetallehclinico.component.html',
  styleUrl: './registrardetallehclinico.component.css'
})
export class RegistrardetallehclinicoComponent {
  form: FormGroup;
  dhClinico: DetalleHClinico = new DetalleHClinico();
  listaHistorialClinico: Historialclinico[] = [];
  listaRecetas: Receta[] = [];
  listaExamenes: Examenes[] = [];
  listaTratamientos: Tratamientos[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dhClinicoService: DetallehclinicoService,
    private historialClinicoService: HistorialclinicoService,
    private recetaService: RecetaService,
    private examenesService: ExamenesService,
    private tratamientosService: TratamientosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idDHClinico: [''],
      descripcionDHClinico: ['', Validators.required],
      fechaDHClinico: ['', Validators.required],
      historialClinico: ['', Validators.required],
      recetas: ['', Validators.required],
      examenes: ['', Validators.required],
      tratamientos: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.historialClinicoService.list().subscribe(data => {
      this.listaHistorialClinico = data;
    });

    this.recetaService.list().subscribe(data => {
      this.listaRecetas = data;
    });

    this.examenesService.list().subscribe(data => {
      this.listaExamenes = data;
    });

    this.tratamientosService.list().subscribe(data => {
      this.listaTratamientos = data;
    });
  }

  registrarDHClinico(): void {
    if (this.form.valid) {
      this.dhClinico.idDHClinico = this.form.value.idDHClinico;
      this.dhClinico.descripcionDHClinico = this.form.value.descripcionDHClinico;
      this.dhClinico.fechaDHClinico = this.form.value.fechaDHClinico;
      this.dhClinico.historialClinico = this.form.value.historialClinico;
      this.dhClinico.recetas = this.form.value.recetas;
      this.dhClinico.examenes = this.form.value.examenes;
      this.dhClinico.tratamientos = this.form.value.tratamientos;

      if (this.edicion) {
        this.dhClinicoService.update(this.dhClinico).subscribe(() => {
          this.dhClinicoService.list().subscribe(data => {
            this.dhClinicoService.setList(data);
          });
        });
      } else {
        this.dhClinicoService.insert(this.dhClinico).subscribe(() => {
          this.dhClinicoService.list().subscribe(data => {
            this.dhClinicoService.setList(data);
          });
        });
      }

      this.router.navigate(['/detalleclinico']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.dhClinicoService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idDHClinico: data.idDHClinico,
          descripcionDHClinico: data.descripcionDHClinico,
          fechaDHClinico: data.fechaDHClinico,
          historialClinico: data.historialClinico,
          recetas: data.recetas,
          examenes: data.examenes,
          tratamientos: data.tratamientos
        });
      });
    }
  }
}
