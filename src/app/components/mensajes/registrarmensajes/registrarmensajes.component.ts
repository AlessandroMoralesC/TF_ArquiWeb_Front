import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from '../../../services/mensajes.service';
import { UsersService } from '../../../services/users.service';
import { Mensajes } from '../../../models/mensaje';
import { Users } from '../../../models/users';
import { CommonModule,NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {  RouterLink } from '@angular/router';


@Component({
  selector: 'app-registrarmensajes',
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
  templateUrl:'./registrarmensajes.component.html',
  styleUrls: ['./registrarmensajes.component.css']
})
export class RegistrarmensajesComponent implements OnInit {
  form: FormGroup;
  mensaje: Mensajes = new Mensajes();
  listaUsuarios: Users[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private mensajesService: MensajesService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idMensaje: [''],
      mensaje: ['', Validators.required],
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

  registrarMensaje(): void {
    if (this.form.valid) {
      this.mensaje.idMensaje = this.form.value.idMensaje;
      this.mensaje.mensaje = this.form.value.mensaje;
      this.mensaje.usuario = this.listaUsuarios.find(user => user.id === this.form.value.usuario)!;

      if (this.edicion) {
        this.mensajesService.update(this.mensaje).subscribe(() => {
          this.mensajesService.list().subscribe(data => {
            this.mensajesService.setList(data);
          });
        });
      } else {
        this.mensajesService.insert(this.mensaje).subscribe(() => {
          this.mensajesService.list().subscribe(data => {
            this.mensajesService.setList(data);
          });
        });
      }

      this.router.navigate(['/mensajes']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.mensajesService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idMensaje: data.idMensaje,
          mensaje: data.mensaje,
          usuario: data.usuario.id
        });
      });
    }
  }
}