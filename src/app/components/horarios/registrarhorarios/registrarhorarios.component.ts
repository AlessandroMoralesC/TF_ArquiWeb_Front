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
import { HorarioMedico } from '../../../models/horarios';
import { HorariosService } from '../../../services/horarios.service';




@Component({
  selector: 'app-registrarhorarios',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarhorarios.component.html',
  styleUrl: './registrarhorarios.component.css'
})
export class RegistrarhorariosComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  horariosss: HorarioMedico=new HorarioMedico();
  id:number=0;
  edicion:boolean=false;
  listaestados: { value: string; viewValue: string }[] = [
    { value: 'En espera', viewValue: 'En espera' },
    { value: 'Cumplido', viewValue: 'Cumplido' },
  ];

  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: HorariosService,
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
      estado: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.horariosss.idHMedico = this.form.value.codigo;
      this.horariosss.fechaHMedico = this.form.value.fechaini;
      this.horariosss.estadoHMedico = this.form.value.estado;
      this.horariosss.cita.idCita = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.horariosss).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.horariosss).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['horarios']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idHMedico),
          fechaini: new FormControl(data.fechaHMedico),
          estado: new FormControl(data.estadoHMedico),
          usuario: new FormControl(data.cita.idCita),

        });
      });
    }
  }
}