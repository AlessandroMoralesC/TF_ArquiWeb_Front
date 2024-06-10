import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    RouterLink,
  ],
  templateUrl: './registrarusuario.component.html',
  styleUrl: './registrarusuario.component.css',
})
export class RegistrarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  listaRoles: Rol[] = [];
  edicion: boolean = false;

  constructor(
    private rS: RolService,
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
      especialidad: [''],
      user: ['', Validators.required],
      pass: ['', Validators.required],
      activo: [true, Validators.required],
      roles: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Asigna los valores del formulario al objeto usuario
      this.usuario.idUsers = this.form.value.id;  // Asegúrate de incluir el ID si estás actualizando
      this.usuario.nombreUsers = this.form.value.nombre;
      this.usuario.apellidoUsers = this.form.value.apellido;
      this.usuario.fechanaciemientoUsers = this.form.value.fechanaciemiento;
      this.usuario.telefonoUsers = this.form.value.telefono;
      this.usuario.correoUsers = this.form.value.correo;
      this.usuario.especialidadUsers = this.form.value.especialidad;
      this.usuario.username = this.form.value.user;
      this.usuario.password = this.form.value.pass;
      this.usuario.enabled = this.form.value.activo;
  
      // Obtén el ID del rol seleccionado del formulario
      const roleId = this.form.value.roles;
  
      // Busca el rol correspondiente en la lista de roles
      const selectedRole = this.listaRoles.find((rol) => rol.idRol === roleId);
  
      // Verifica si se encontró un rol seleccionado
      if (selectedRole) {
        // Asigna el rol encontrado al usuario
        this.usuario.role = selectedRole;
  
        if (this.edicion) {
          // Llamada al servicio para actualizar el usuario
          this.uS.update(this.usuario).subscribe(
            (response) => {
              this.uS.list().subscribe((data) => {
                this.uS.setList(data);
              });
              // Navega después de la actualización exitosa
              this.router.navigate(['usuarios']);
            },
            (error) => {
              console.error('Error al actualizar el usuario:', error);
            }
          );
        } else {
          // Llamada al servicio para insertar un nuevo usuario
          this.uS.insert(this.usuario).subscribe(
            (response) => {
              this.uS.list().subscribe((data) => {
                this.uS.setList(data);
              });
              // Navega después de la inserción exitosa
              this.router.navigate(['usuarios']);
            },
            (error) => {
              console.error('Error al registrar el usuario:', error);
            }
          );
        }
      } else {
        // Manejar el caso donde no se encontró el rol seleccionado
        console.error('No se encontró el rol seleccionado.');
      }
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: new FormControl(data.idUsers),
          nombre: new FormControl(data.nombreUsers, Validators.required),
          apellido: new FormControl(data.apellidoUsers, Validators.required),
          fechanaciemiento: new FormControl(data.fechanaciemientoUsers, Validators.required),
          telefono: new FormControl(data.telefonoUsers, [
            Validators.required,
            Validators.pattern('^[0-9]{9,11}$'),
          ]),
          correo: new FormControl(data.correoUsers, [Validators.required, Validators.email]),
          especialidad: new FormControl(data.especialidadUsers),
          user: new FormControl(data.username, Validators.required),
          pass: new FormControl(data.password, Validators.required),
          activo: new FormControl(data.enabled, Validators.required),
          roles: new FormControl(data.role.idRol, Validators.required),
        });
      });
    }
  }
}