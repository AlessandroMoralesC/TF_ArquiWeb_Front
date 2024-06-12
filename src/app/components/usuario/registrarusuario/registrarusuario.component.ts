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
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatNativeDateModule } from '@angular/material/core';

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
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      id: [''],
      nombreUsers: ['', Validators.required],
      apellidoUsers: ['', Validators.required],
      fechanaciemientoUsers: ['', Validators.required],
      telefonoUsers: ['', [Validators.required, Validators.pattern('^[0-9]{9,11}$')]],
      correoUsers: ['', [Validators.required, Validators.email]],
      especialidadUsers: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [true, Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsers = this.form.value.id;
      this.usuario.nombreUsers = this.form.value.nombreUsers;
      this.usuario.apellidoUsers = this.form.value.apellidoUsers;
      this.usuario.fechanaciemientoUsers = this.form.value.fechanaciemientoUsers;
      this.usuario.telefonoUsers = this.form.value.telefonoUsers;
      this.usuario.correoUsers = this.form.value.correoUsers;
      this.usuario.especialidadUsers = this.form.value.especialidadUsers;
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.enabled = this.form.value.enabled;

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
          nombreUsers: [data.nombreUsers, Validators.required],
          apellidoUsers: [data.apellidoUsers, Validators.required],
          fechanaciemientoUsers: [data.fechanaciemientoUsers, Validators.required],
          telefonoUsers: [data.telefonoUsers, [Validators.required, Validators.pattern('^[0-9]{9,11}$')]],
          correoUsers: [data.correoUsers, [Validators.required, Validators.email]],
          especialidadUsers: [data.especialidadUsers, Validators.required],
          username: [data.username, Validators.required],
          password: [data.password, Validators.required],
          enabled: [data.enabled, Validators.required]
        });
      });
    }
  }
}