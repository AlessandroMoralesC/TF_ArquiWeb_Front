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
import { Cita } from '../../../models/citas';
import { CitasService } from '../../../services/citas.service';

@Component({
  selector: 'app-registrarcitas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarcitas.component.html',
  styleUrl: './registrarcitas.component.css'
})
export class RegistrarcitasComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  citass: Cita=new Cita();
  id:number=0;
  edicion:boolean=false;


  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: CitasService,
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
      fechaini: ['', Validators.required],
      motivo: ['', Validators.required],
      hora: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.citass.idCita = this.form.value.codigo;
      this.citass.fechaCita = this.form.value.fechaini;
      this.citass.motivoCita = this.form.value.motivo;
      this.citass.horaCita = this.form.value.hora;
      this.citass.usuario.id = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.citass).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.citass).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['citas']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCita),
          fechaini: new FormControl(data.fechaCita),
          motivo: new FormControl(data.motivoCita),
          hora: new FormControl(data.horaCita),
          usuario: new FormControl(data.usuario.id),

        });
      });
    }
  }
}