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
import { Comunidad } from '../../../models/comunidades';
import { ComunidadesService } from '../../../services/comunidades.service';

@Component({
  selector: 'app-registrarcomunidades',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarcomunidades.component.html',
  styleUrl: './registrarcomunidades.component.css'
})
export class RegistrarcomunidadesComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  comunidad: Comunidad=new Comunidad();
  id:number=0;
  edicion:boolean=false;

  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: ComunidadesService,
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
      experiencias: ['', Validators.required],
      aprobaciones: ['', Validators.required],
      Recomendaciones: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.comunidad.idComunidad = this.form.value.codigo;
      this.comunidad.experienciasComunidad = this.form.value.experiencias;
      this.comunidad.aprobacionesComunidad = this.form.value.aprobaciones;
      this.comunidad.recomendacionesComunidad = this.form.value.Recomendaciones;
      this.comunidad.usuario.id = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.comunidad).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.comunidad).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['comunidades']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idComunidad),
          experiencias: new FormControl(data.experienciasComunidad),
          aprobaciones: new FormControl(data.aprobacionesComunidad),
          Recomendaciones: new FormControl(data.recomendacionesComunidad),
          usuario: new FormControl(data.usuario.id),

        });
      });
    }
  }
}