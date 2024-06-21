import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../services/users.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
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
import { Materiales } from '../../../models/materiales';
import { MaterialesService } from '../../../services/materiales.service';
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { Users } from '../../../models/users';
import { TipoMaterial } from '../../../models/tipomaterial';
import { Comunidad } from '../../../models/comunidad';
import { ComunidadService } from '../../../services/comunidad.service';

@Component({
  selector: 'app-registrarcomunidad',
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
  templateUrl: './registrarcomunidad.component.html',
  styleUrl: './registrarcomunidad.component.css'
})
export class RegistrarcomunidadComponent implements OnInit {
  form: FormGroup;
  comunidad: Comunidad = new Comunidad();
  listaUsuarios: Users[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private comunidadService: ComunidadService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idComunidad: [''],
      experienciasComunidad: [''],
      aprobacionesComunidad: [''],
      recomendacionesComunidad: [''],
      usuario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.usersService.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  registrarComunidad(): void {
    if (this.form.valid) {
      this.comunidad.IdComunidad = this.form.value.idComunidad;
      this.comunidad.experienciasComunidad = this.form.value.experienciasComunidad;
      this.comunidad.aprobacionesComunidad = this.form.value.aprobacionesComunidad;
      this.comunidad.recomendacionesComunidad = this.form.value.recomendacionesComunidad;
      this.comunidad.usuario = { id: this.form.value.usuario } as Users;

      if (this.edicion) {
        this.comunidadService.update(this.comunidad).subscribe(() => {
          this.comunidadService.list().subscribe(data => {
            this.comunidadService.setList(data);
          });
        });
      } else {
        this.comunidadService.insert(this.comunidad).subscribe(() => {
          this.comunidadService.list().subscribe(data => {
            this.comunidadService.setList(data);
          });
        });
      }

      this.router.navigate(['/comunidad']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.comunidadService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idComunidad: data.IdComunidad,
          experienciasComunidad: data.experienciasComunidad,
          aprobacionesComunidad: data.aprobacionesComunidad,
          recomendacionesComunidad: data.recomendacionesComunidad,
          usuario: data.usuario.id
        });
      });
    }
  }
}
