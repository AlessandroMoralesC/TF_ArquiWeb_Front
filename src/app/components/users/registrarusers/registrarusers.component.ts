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

@Component({
  selector: 'app-registrarusers',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarusers.component.html',
  styleUrl: './registrarusers.component.css'
})
export class RegistrarusersComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  Users: Users=new Users();
  id:number=0;
  edicion:boolean=false;

  listaespe: { value: string; viewValue: string }[] = [
    { value: 'Ninguna', viewValue: 'Ninguna' },
    { value: 'Psicologo A', viewValue: 'Psicologo A' },
    { value: 'Psicologo B', viewValue: 'Psicologo B' },
    { value: 'Admin', viewValue: 'Admin' },
  ];
  constructor(
    private formBuilber: FormBuilder,
    private mS: UsersService,
    private router: Router,
    private route:ActivatedRoute
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
      apellido: ['', Validators.required],
      fechanaci: ['', Validators.required],
      telefono: ['', Validators.required],
      correo:['', Validators.required],
      especialidad:['', Validators.required],
      username: ['', Validators.required],
      contrasena:['', Validators.required],
      enabled:[false, Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.Users.id = this.form.value.codigo;
      this.Users.nombreUsers = this.form.value.nombre;
      this.Users.apellidoUsers = this.form.value.apellido;
      this.Users.fechanaciemientoUsers = this.form.value.fechanaci;
      this.Users.telefonoUsers = this.form.value.telefono;
      this.Users.correoUsers = this.form.value.correo;
      this.Users.especialidadUsers = this.form.value.especialidad;
      this.Users.username = this.form.value.username;
      this.Users.password = this.form.value.contrasena;
      this.Users.enabled = this.form.value.enabled;
      if(this.edicion)
        {
            this.mS.update(this.Users).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.Users).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['usuarios']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombreUsers),
          apellido: new FormControl(data.apellidoUsers),
          fechanaci: new FormControl(data.fechanaciemientoUsers),
          telefono: new FormControl(data.telefonoUsers),
          correo: new FormControl(data.correoUsers),
          especialidad: new FormControl(data.especialidadUsers),
          username: new FormControl(data.username),
          contrasena: new FormControl(data.password),
          enabled: new FormControl(data.enabled)
        });
      });
    }
  }
}