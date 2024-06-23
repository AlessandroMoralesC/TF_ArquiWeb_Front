import { Materiales } from './../../../models/materiales';
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
import { TipoMaterial } from '../../../models/tipomaterial';
import { MaterialesService } from '../../../services/materiales.service';
import { TipomaterialService } from '../../../services/tipomaterial.service';


@Component({
  selector: 'app-registrarmateriales',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrarmateriales.component.html',
  styleUrl: './registrarmateriales.component.css'
})
export class RegistrarmaterialesComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  material: Materiales=new Materiales();
  id:number=0;
  edicion:boolean=false;


  listaestados: { value: string; viewValue: string }[] = [
    { value: 'Iniciando', viewValue: 'Iniciando' },
    { value: 'En Progreso', viewValue: 'En Progreso' },
    { value: 'Completado', viewValue: 'Completado' },
  ];
  listausuario: Users[] = [];
  listatipo: TipoMaterial[]=[];

  constructor(
    private formBuilber: FormBuilder,
    private mS: MaterialesService,
    private router: Router,
    private route:ActivatedRoute,
    private cs: UsersService,
    private tp: TipomaterialService

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
      usuario: ['', Validators.required],
      tipoma: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listausuario= data;
    });
    this.tp.list().subscribe((data) => {
      this.listatipo= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.material.idMateriales = this.form.value.codigo;
      this.material.nombreMateriales = this.form.value.nombre;
      this.material.usuario.id = this.form.value.usuario;
      this.material.tipoMaterial.idTMaterial = this.form.value.tipoma;


      if(this.edicion)
        {
            this.mS.update(this.material).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.material).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['materiales']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMateriales),
          nombre: new FormControl(data.nombreMateriales),
          usuario: new FormControl(data.usuario.id),
          tipoma: new FormControl(data.tipoMaterial.idTMaterial),


        });
      });
    }
  }
}