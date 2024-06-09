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
import { MatNativeDateModule } from '@angular/material/core';
import { Usuario } from '../../../models/usuario';
import { Mensajes } from '../../../models/mensajes';
import { UsuarioService } from '../../../services/usuario.service';
import { MensajesService } from '../../../services/mensajes.service';

@Component({
  selector: 'app-registrarmensajes',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgIf,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterLink  ],
  templateUrl: './registrarmensajes.component.html',
  styleUrl: './registrarmensajes.component.css'
})
export class RegistrarmensajesComponent implements OnInit {
  form: FormGroup = new FormGroup({}); 
  mensaje: Mensajes=new Mensajes();
  listaUsuarios: Usuario[] = [];

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mS: MensajesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idMensaje: [''],
      mensaje: ['', Validators.required],
      usuarios: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.mensaje.mensaje=this.form.value.mensaje;
  
      // Obtén el ID del rol seleccionado del formulario
      const usuarioId = this.form.value.usuarios;
      
      // Busca el rol correspondiente en la lista de roles
      const selectedUsuario = this.listaUsuarios.find(usuario => usuario.idUsers === usuarioId);
      
      // Verifica si se encontró un rol seleccionado
      if (selectedUsuario) {
        // Asigna el rol encontrado al usuario
        this.mensaje.usuario = selectedUsuario;
  
        // Luego, guarda el usuario y maneja el resultado
        this.mS.insert(this.mensaje).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
  
        this.router.navigate(['mensajes/nuevo']);
      } else {
        // Manejar el caso donde no se encontró el rol seleccionado
        console.error('No se encontró el rol seleccionado.');
      }
    }
  }
}
