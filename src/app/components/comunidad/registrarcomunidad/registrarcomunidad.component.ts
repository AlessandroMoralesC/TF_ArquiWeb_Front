import { Component,OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Params,ActivatedRoute, Router, RouterLink } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { Comunidad } from '../../../models/comunidad';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ComunidadService } from '../../../services/comunidad.service';

@Component({
  selector: 'app-registrarcomunidad',
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
  templateUrl: './registrarcomunidad.component.html',
  styleUrl: './registrarcomunidad.component.css'
})
export class RegistrarcomunidadComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  comunidad: Comunidad=new Comunidad();
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;
  listaexperiencias: { value: string; viewValue: string }[] = [
    { value: 'Experimentado', viewValue: 'Experimentado' },
    { value: 'Reciente', viewValue: 'Reciente' },
  ];
  listaaprobaciones: { value: string; viewValue: string }[] = [
    { value: 'Experimentado', viewValue: 'Experimentado' },
    { value: 'Reciente', viewValue: 'Reciente' },
  ];
  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mS: ComunidadService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      IdComunidad: [''],
      experienciasComunidad:['', Validators.required],
      aprobacionesComunidad: ['', Validators.required],
      recomendacionesComunidad: ['', Validators.required],
      usuarios: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.comunidad.IdComunidad=this.form.value.IdComunidad;
      this.comunidad.experienciasComunidad=this.form.value.experienciasComunidad;
      this.comunidad.aprobacionesComunidad=this.form.value.aprobacionesComunidad;
      this.comunidad.recomendacionesComunidad=this.form.value.recomendacionesComunidad;
  
      // Obtén el ID del rol seleccionado del formulario
      const usuarioId = this.form.value.usuarios;
      
      // Busca el rol correspondiente en la lista de roles
      const selectedUsuario = this.listaUsuarios.find(usuario => usuario.idUsers === usuarioId);
      
      // Verifica si se encontró un rol seleccionado
      if (selectedUsuario) {
        // Asigna el rol encontrado al usuario
        this.comunidad.usuario = selectedUsuario;
  
        // Luego, guarda el usuario y maneja el resultado
        if (this.edicion) {
          this.mS.update(this.comunidad).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        } else {
          this.mS.insert(this.comunidad).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
  
        this.router.navigate(['comunidad/nuevo']);
      } else {
        // Manejar el caso donde no se encontró el rol seleccionado
        console.error('No se encontró el rol seleccionado.');
      }
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          IdComunidad: [data.IdComunidad],
          experienciasComunidad:[data.experienciasComunidad, Validators.required],
          aprobacionesComunidad: [data.aprobacionesComunidad, Validators.required],
          recomendacionesComunidad: [data.recomendacionesComunidad, Validators.required],
          usuarios: [data.usuario.idUsers, Validators.required]
        });
      });
    }
  }
}
