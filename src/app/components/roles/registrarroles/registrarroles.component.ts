import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink,Params } from '@angular/router';
import { Role } from '../../../models/roles';
import { Users } from '../../../models/users';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-registrarroles',
  standalone: true,
  imports: [MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,],
  templateUrl: './registrarroles.component.html',
  styleUrl: './registrarroles.component.css'
})
export class RegistrarrolesComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  rol: Role=new Role();
  id:number=0;
  edicion:boolean=false;


  listaroles: { value: string; viewValue: string }[] = [
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    { value: 'PSICOLOGO', viewValue: 'PSICOLOGO' },
    { value: 'PACIENTE', viewValue: 'PACIENTE' },
  ];
  listausuario: Users[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: RolesService,
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
      rols: ['', Validators.required],
      usuario: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.rol.id = this.form.value.codigo;
      this.rol.rol = this.form.value.rols;
      this.rol.user.id = this.form.value.usuario;

      if(this.edicion)
        {
            this.mS.update(this.rol).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.rol).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['roles']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          rols: new FormControl(data.rol),
          usuario: new FormControl(data.user.id),

        });
      });
    }
  }
}