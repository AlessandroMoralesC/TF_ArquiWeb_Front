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
import { Historialclinico } from '../../../models/historialclinicos';
import { HistorialclinicosService } from '../../../services/historialclinicos.service';


@Component({
  selector: 'app-registrarhistorialclinicos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarhistorialclinicos.component.html',
  styleUrl: './registrarhistorialclinicos.component.css'
})
export class RegistrarhistorialclinicosComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  historailcli: Historialclinico=new Historialclinico();
  id:number=0;
  edicion:boolean=false;

  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: HistorialclinicosService,
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
      fecha: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.historailcli.idHClinico = this.form.value.codigo;
      this.historailcli.fechaperturaHClinico = this.form.value.fecha;
      this.historailcli.usuario.id = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.historailcli).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.historailcli).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['historialclinicos']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idHClinico),
          fecha: new FormControl(data.fechaperturaHClinico),
          usuario: new FormControl(data.usuario.id),

        });
      });
    }
  }
}