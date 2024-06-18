import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Rol } from '../../../models/rol';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';


@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatSelectModule],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css'
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup;
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = []; // Arreglo para almacenar la lista de usuarios

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService, // Servicio de usuario para obtener la lista de usuarios
    private rolService: RolService, // Servicio de rol para realizar operaciones CRUD
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      rol: ['', Validators.required],
      usuarioId: ['', Validators.required] // FormControl para el ID del usuario asociado al rol
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.usuarioService.list().subscribe((data) => {
      this.listaUsuarios = data; // Obtener la lista de usuarios al inicializar el componente
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.id = this.form.value.id;
      this.rol.rol = this.form.value.rol;
      this.rol.user.idUsers = this.form.value.user;

      if (this.edicion) {
        this.rolService.update(this.rol).subscribe(() => {
          this.actualizarListaRoles();
        });
      } else {
        this.rolService.insert(this.rol).subscribe(() => {
          this.actualizarListaRoles();
        });
      }

      this.router.navigate(['/roles/nuevo']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.rolService.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          id: data.id,
          rol: data.rol,
          usuarioId: data.user.idUsers // Asignar el ID del usuario asociado al rol en modo edición
        });
      });
    }
  }

  private actualizarListaRoles(): void {
    this.rolService.list().subscribe((data) => {
      this.rolService.setList(data);
    });
  }
}
