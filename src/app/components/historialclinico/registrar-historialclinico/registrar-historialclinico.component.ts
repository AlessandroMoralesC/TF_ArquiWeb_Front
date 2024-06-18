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
import { UsuarioService } from '../../../services/usuario.service';
import { historialclinico } from '../../../models/historialclinico';
import { HistorialclinicoService } from '../../../services/historialclinico';


@Component({
  selector: 'app-registrar-historialclinico',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './registrar-historialclinico.component.html',
  styleUrls: ['./registrar-historialclinico.component.css'],
})
export class RegistrarHistorialclinicoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  historialclinico: historialclinico = new historialclinico();
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private hS: HistorialclinicoService,
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
      idHClinico: [''],
      fechaperturaHClinico: ['', Validators.required],
      usuarios: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.historialclinico.idHClinico = this.form.value.idHClinico;
      this.historialclinico.fechaperturaHClinico = this.form.value.fechaperturaHClinico;

      const usuarioId = this.form.value.usuarios;
      const selectedUsuario = this.listaUsuarios.find(usuario => usuario.id === usuarioId);

      if (selectedUsuario) {
        this.historialclinico.usuario = selectedUsuario;

        if (this.edicion) {
          this.hS.update(this.historialclinico).subscribe(() => {
            this.hS.list().subscribe((data) => {
              this.hS.setList(data);
            });
          });
        } else {
          this.hS.insert(this.historialclinico).subscribe(() => {
            this.hS.list().subscribe((data) => {
              this.hS.setList(data);
            });
          });
        }

        this.router.navigate(['/historialclinico']);
      } else {
        console.error('No se encontró el usuario seleccionado.');
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.hS.listId(this.id).subscribe((data) => {
        this.form.setValue({
          idHClinico: data.idHClinico,
          fechaperturaHClinico: data.fechaperturaHClinico,
          usuarios: data.usuario.id,
        });
      });
    }
  }
}