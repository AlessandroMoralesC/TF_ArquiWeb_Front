import { Component,OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
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
  styleUrl: './registrarusuario.component.css'
})
export class RegistrarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({}); 
  usuario: Usuario=new Usuario();
  listaRoles: Rol[] = [];

  constructor(
    private rS: RolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechanaciemiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,11}$')]],
      correo: ['', [Validators.required, Validators.email]],
      especialidad: [''],
      user: ['', Validators.required],
      pass: ['', Validators.required],
      activo: [true, Validators.required],
      roles: ['', Validators.required]
    });
    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
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
      const selectedRole = this.listaRoles.find(rol => rol.idRol === roleId);
      
      // Verifica si se encontró un rol seleccionado
      if (selectedRole) {
        // Asigna el rol encontrado al usuario
        this.usuario.role = selectedRole;
  
        // Luego, guarda el usuario y maneja el resultado
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
  
        this.router.navigate(['usuarios/nuevo']);
      } else {
        // Manejar el caso donde no se encontró el rol seleccionado
        console.error('No se encontró el rol seleccionado.');
      }
    }
  }
}
