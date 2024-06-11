import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registrar-cita',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule,
    CommonModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatInputModule,
    NgIf, MatNativeDateModule, RouterLink, MatTableModule
  ],
  templateUrl: './registrar-cita.component.html',
  styleUrl: './registrar-cita.component.css'
})
export class RegistrarCitaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cita: Cita = new Cita();
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: CitaService,
    private router: Router,
    private uS: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      motivo: ['', Validators.required],
      hora: ['', [Validators.required, Validators.min(1), Validators.max(24)]],
      usuario: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cita.idCita = this.form.value.codigo;
      this.cita.fechaCita = this.form.value.fecha;
      this.cita.motivoCita = this.form.value.motivo;
      this.cita.horaCita = this.form.value.hora;

      // Asigna el objeto Usuario completo al campo usuario de la cita
      const usuarioId = this.form.value.usuario;
      const selectedUsuario = this.listaUsuarios.find(u => u.idUsers === usuarioId);

      if (selectedUsuario) {
        this.cita.usuario = selectedUsuario;

        if (this.edicion) {
          this.cS.update(this.cita).subscribe(() => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
          });
        } else {
          this.cS.insert(this.cita).subscribe(() => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
          });
        }

        this.router.navigate(['citas/nuevo']);
      } else {
        console.error('Usuario no encontrado.');
      }
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: [data.idCita],
          fecha: [data.fechaCita, Validators.required],
          motivo: [data.motivoCita, Validators.required],
          hora: [data.horaCita, [Validators.required, Validators.min(1), Validators.max(24)]],
          usuario: [data.usuario.idUsers, Validators.required]
        });
      });
    }
  }
}