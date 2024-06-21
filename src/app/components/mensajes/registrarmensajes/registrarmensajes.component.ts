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
import { Mensajes } from '../../../models/mensajes';
import { MensajesService } from '../../../services/mensajes.service';


@Component({
  selector: 'app-registrarmensajes',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarmensajes.component.html',
  styleUrl: './registrarmensajes.component.css'
})
export class RegistrarmensajesComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  mensaje: Mensajes=new Mensajes();
  id:number=0;
  edicion:boolean=false;
  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: MensajesService,
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
      mensajes: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.mensaje.idMensaje = this.form.value.codigo;
      this.mensaje.mensaje = this.form.value.mensajes;
      this.mensaje.usuario.id = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.mensaje).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.mensaje).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['mensajes']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMensaje),
          mensajes: new FormControl(data.mensaje),
          usuario: new FormControl(data.usuario.id),

        });
      });
    }
  }
}