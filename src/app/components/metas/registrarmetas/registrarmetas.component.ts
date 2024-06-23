import { Users } from './../../../models/users';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute,Params,Router,RouterLink } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UsersService } from '../../../services/users.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Meta } from '../../../models/metas';
import { MetasService } from '../../../services/metas.service';

@Component({
  selector: 'app-registrarmetas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarmetas.component.html',
  styleUrl: './registrarmetas.component.css'
})
export class RegistrarmetasComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  metas: Meta=new Meta();
  id:number=0;
  edicion:boolean=false;


  listaestados: { value: string; viewValue: string }[] = [
    { value: 'Iniciando', viewValue: 'Iniciando' },
    { value: 'En Progreso', viewValue: 'En Progreso' },
    { value: 'Completado', viewValue: 'Completado' },
  ];
  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: MetasService,
    private router: Router,
    private route:ActivatedRoute,
    private cs: UsersService,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilber.group({
      codigo: [''],
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.metas.idMeta = this.form.value.codigo;
      this.metas.nombreMeta = this.form.value.nombre;
      this.metas.estadoMeta = this.form.value.estado;
      this.metas.descripcionMeta = this.form.value.descripcion;
      this.metas.usuario.id = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.metas).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.metas).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['metas']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMeta),
          nombre: new FormControl(data.nombreMeta),
          estado: new FormControl(data.estadoMeta),
          descripcion: new FormControl(data.descripcionMeta),
          usuario: new FormControl(data.usuario.id),

        });
      });
    }
  }
}