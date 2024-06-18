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
import { Meta } from '../../../models/metas';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MetasService } from '../../../services/metas.service';



@Component({
  selector: 'app-registrarmetas',
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
  templateUrl: './registrarmetas.component.html',
  styleUrl: './registrarmetas.component.css'
})
export class RegistrarmetasComponent implements OnInit  {
  form: FormGroup = new FormGroup({}); 
  meta: Meta=new Meta();
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;
  listametas: { value: string; viewValue: string }[] = [
    { value: 'Iniciando', viewValue: 'Iniciando' },
    { value: 'En progreso', viewValue: 'En progreso' },
    { value: 'Completado', viewValue: 'Completado' },
  ];
  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mS: MetasService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idMeta: [''],
      estadoMeta:['', Validators.required],
      nombreMeta: ['', Validators.required],
      descripcionMeta: ['', Validators.required],
      usuarios: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.meta.idMeta=this.form.value.idMeta;
      this.meta.estadoMeta=this.form.value.estadoMeta;
      this.meta.nombreMeta=this.form.value.nombreMeta;
      this.meta.descripcionMeta=this.form.value.descripcionMeta;
  
      // Obtén el ID del rol seleccionado del formulario
      const usuarioId = this.form.value.usuarios;
      
      // Busca el rol correspondiente en la lista de roles
      const selectedUsuario = this.listaUsuarios.find(usuario => usuario.id === usuarioId);
      
      // Verifica si se encontró un rol seleccionado
      if (selectedUsuario) {
        // Asigna el rol encontrado al usuario
        this.meta.usuario = selectedUsuario;
  
        // Luego, guarda el usuario y maneja el resultado
        if (this.edicion) {
          this.mS.update(this.meta).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        } else {
          this.mS.insert(this.meta).subscribe(() => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
  
        this.router.navigate(['metas/nuevo']);
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
          idMeta: [data.idMeta],
          estadoMeta:[data.estadoMeta, Validators.required],
          nombreMeta: [data.nombreMeta, Validators.required],
          descripcionMeta: [data.descripcionMeta, Validators.required],
          usuarios: [data.usuario.id, Validators.required]
        });
      });
    }
  }
}
