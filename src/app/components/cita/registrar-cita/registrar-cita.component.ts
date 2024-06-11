import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute, Params, RouterLink, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
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

  constructor(
    private formBuilber: FormBuilder,
    private cS: CitaService,
    private router: Router,
    private uS: UsuarioService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilber.group({
      codigo: [''],
      fecha: ['', Validators.required],
      motivo: ['', Validators.required],
      hora: ['', [Validators.required, Validators.min(1), Validators.max(24), Validators.pattern('^[0-9]{1,2}$')]],
      usuario: ['', Validators.required],
      estado: ['', Validators.required]
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
      this.cita.idUsuario = this.form.value.usuario;
      this.cita.estadoCita = this.form.value.estado;

      const userID = this.form.value.usuario;
      const selectUser = this.listaUsuarios.find(user => user.idUsers === userID);

      if (selectUser) {
        this.cita.idUsuario = selectUser;

        this.cS.insert(this.cita).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });

        this.router.navigate(['citas/nuevo']);
      } else {
        console.error('No se encontró el usuario seleccionado.');
      }
    }
  }

}
//
