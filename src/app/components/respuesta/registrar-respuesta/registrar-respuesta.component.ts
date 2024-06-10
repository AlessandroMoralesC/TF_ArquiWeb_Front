import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Respuesta } from '../../../models/respuesta';
import { UsuarioService } from '../../../services/usuario.service';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-registrar-respuesta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './registrar-respuesta.component.html',
  styleUrls: ['./registrar-respuesta.component.css']
})
export class RegistrarRespuestaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  respuesta: Respuesta = new Respuesta();
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private rS: RespuestaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idRespuesta: [{ value: '', disabled: true }],
      pregunta: ['', Validators.required],
      respuestas: ['', Validators.required],
      usuarios: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.respuesta.pregunta = this.form.value.pregunta;
      this.respuesta.respuestas = this.form.value.respuestas;

      const usuarioId = this.form.value.usuarios;
      const selectedUsuario = this.listaUsuarios.find(usuario => usuario.idUsers === usuarioId);

      if (selectedUsuario) {
        this.respuesta.usuario = selectedUsuario;

        if (this.edicion) {
          this.respuesta.idRespuesta = this.form.getRawValue().idRespuesta; // Recuperar el valor deshabilitado
          this.rS.update(this.respuesta).subscribe(() => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
          });
        } else {
          this.rS.insert(this.respuesta).subscribe(() => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
          });
        }

        this.router.navigate(['respuestas']);
      } else {
        console.error('No se encontró el usuario seleccionado.');
      }
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          idRespuesta: [{ value: data.idRespuesta, disabled: true }],
          pregunta: [data.pregunta, Validators.required],
          respuestas: [data.respuestas, Validators.required],
          usuarios: [data.usuario.idUsers, Validators.required],
        });
      });
    }
  }
}
