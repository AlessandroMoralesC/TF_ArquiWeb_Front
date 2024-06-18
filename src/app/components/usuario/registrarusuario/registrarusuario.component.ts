import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Params, ActivatedRoute, Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatNativeDateModule } from '@angular/material/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-registrarusuario',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgIf,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './registrarusuario.component.html',
  styleUrls: ['./registrarusuario.component.css']
})
export class RegistrarusuarioComponent implements OnInit {
  form: FormGroup=new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechanaciemiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,11}$')]],
      correo: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required],
      activo: [true, Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsers = this.form.value.id;
      this.usuario.nombreUsers = this.form.value.nombre;
      this.usuario.apellidoUsers = this.form.value.apellido;
      this.usuario.fechanaciemientoUsers = this.form.value.fechanaciemiento;
      this.usuario.telefonoUsers = this.form.value.telefono;
      this.usuario.correoUsers = this.form.value.correo;
      this.usuario.especialidadUsers = this.form.value.especialidad;
      this.usuario.username = this.form.value.user;
      this.usuario.password = this.form.value.pass;
      this.usuario.enabled = this.form.value.activo;

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }

      this.router.navigate(['usuarios/nuevo']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: [data.idUsers],
          nombre: [data.nombreUsers, Validators.required],
          apellido: [data.apellidoUsers, Validators.required],
          fechanaciemiento: [data.fechanaciemientoUsers, Validators.required],
          telefono: [data.telefonoUsers, [Validators.required, Validators.pattern('^[0-9]{9,11}$')]],
          correo: [data.correoUsers, [Validators.required, Validators.email]],
          especialidad: [data.especialidadUsers, Validators.required],
          user: [data.username, Validators.required],
          pass: [data.password, Validators.required],
          activo: [data.enabled, Validators.required]
        });
      });
    }
  }
}