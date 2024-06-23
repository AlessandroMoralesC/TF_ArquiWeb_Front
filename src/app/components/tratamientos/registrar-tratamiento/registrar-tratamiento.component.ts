import { Tratamientos } from './../../../models/tratamientos';
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
import { TratamientosService } from '../../../services/tratamientos.service';

@Component({
  selector: 'app-registrar-tratamiento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,RouterLink],
  templateUrl: './registrar-tratamiento.component.html',
  styleUrl: './registrar-tratamiento.component.css'
})
export class RegistrarTratamientoComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  Tratamiento: Tratamientos=new Tratamientos();
  id:number=0;
  edicion:boolean=false;

  listaestados: { value: string; viewValue: string }[] = [
    { value: 'Iniciando', viewValue: 'Iniciando' },
    { value: 'En Progreso', viewValue: 'En Progreso' },
    { value: 'Completado', viewValue: 'Completado' },
  ];
  listaefectividad: { value: string; viewValue: string }[] = [
    { value: 'No efectivo', viewValue: 'No efectivo' },
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Muy efectivo', viewValue: 'Muy efectivo' },
  ];
  constructor(
    private formBuilber: FormBuilder,
    private mS: TratamientosService,
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
      fechaini: ['', Validators.required],
      fechafin: ['', Validators.required],
      estadotratamiento: ['', Validators.required],
      descripciontratamiento:['', Validators.required],
      efectividadtratamiento:['', Validators.required],

    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.Tratamiento.idTratamientos = this.form.value.codigo;
      this.Tratamiento.nombreTratamientos = this.form.value.nombre;
      this.Tratamiento.fechainicioTratamientos = this.form.value.fechaini;
      this.Tratamiento.fechafinTratamientos = this.form.value.fechafin;
      this.Tratamiento.estadoTratamientos = this.form.value.estadotratamiento;
      this.Tratamiento.descripcionTratamientos = this.form.value.descripciontratamiento;
      this.Tratamiento.efectividadTratamientos = this.form.value.efectividadtratamiento;
      if(this.edicion)
        {
            this.mS.update(this.Tratamiento).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.Tratamiento).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['tratamientos']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTratamientos),
          nombre: new FormControl(data.nombreTratamientos),
          fechaini: new FormControl(data.fechainicioTratamientos),
          fechafin: new FormControl(data.fechafinTratamientos),
          estadotratamiento: new FormControl(data.estadoTratamientos),
          descripciontratamiento: new FormControl(data.descripcionTratamientos),
          efectividadtratamiento: new FormControl(data.efectividadTratamientos)
        });
      });
    }
  }
}
