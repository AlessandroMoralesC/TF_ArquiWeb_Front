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
import { DetalleClinico } from '../../../models/detallesclinicos';
import { DetalleclinicosService } from '../../../services/detalleclinicos.service';
import { Historialclinico } from '../../../models/historialclinicos';
import { Examenes } from '../../../models/examenes';
import { Tratamientos } from '../../../models/tratamientos';
import { Receta } from '../../../models/receta';
import { HistorialclinicosService } from '../../../services/historialclinicos.service';
import { TratamientosService } from '../../../services/tratamientos.service';
import { ExamenesService } from '../../../services/examenes.service';
import { RecetaService } from '../../../services/receta.service';



@Component({
  selector: 'app-registrardetallesclinicos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule,RouterLink,],
  templateUrl: './registrardetallesclinicos.component.html',
  styleUrl: './registrardetallesclinicos.component.css'
})
export class RegistrardetallesclinicosComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  detallless: DetalleClinico=new DetalleClinico();
  id:number=0;
  edicion:boolean=false;
  listarhistorial: Historialclinico[] = [];
  listarexamen: Examenes[] = [];
  listartratamiento:Tratamientos[] = [];
  listarrecetas:Receta[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private mS: DetalleclinicosService,
    private router: Router,
    private route:ActivatedRoute,
    private cs: HistorialclinicosService,
    private ps: TratamientosService,
    private xs: ExamenesService,
    private zs: RecetaService,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilber.group({
      codigo: [''],
      descripcionsss: ['', Validators.required],
      fechasss: ['', Validators.required],
      historialclinico: ['', Validators.required],
      examenessss: ['', Validators.required],
      Tratamientos: ['', Validators.required],
      Recetas: ['', Validators.required],

    });
    this.cs.list().subscribe((data) => {
      this.listarhistorial= data;
    });
    this.ps.list().subscribe((data) => {
      this.listartratamiento= data;
    });
    this.xs.list().subscribe((data) => {
      this.listarexamen= data;
    });
    this.zs.list().subscribe((data) => {
      this.listarrecetas= data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.detallless.idDHClinico = this.form.value.codigo;
      this.detallless.descripcionDHClinico = this.form.value.descripcionsss;
      this.detallless.fechaDHClinico = this.form.value.fechasss;
      this.detallless.historialClinico.idHClinico = this.form.value.historialclinico;
      this.detallless.examenes.idExamenes = this.form.value.examenessss;
      this.detallless.tratamientos.idTratamientos = this.form.value.Tratamientos;
      this.detallless.recetas.idRecetas = this.form.value.Recetas;




      if(this.edicion)
        {
            this.mS.update(this.detallless).subscribe((data) => {
              this.mS.list().subscribe((data) => {
                this.mS.setList(data);
              });
            });
        }else{
          this.mS.insert(this.detallless).subscribe((data) => {
            this.mS.list().subscribe((data) => {
              this.mS.setList(data);
            });
          });
        }
      this.router.navigate(['detallesclinicos']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDHClinico),
          descripcionsss: new FormControl(data.descripcionDHClinico),
          fechasss: new FormControl(data.fechaDHClinico),
          historialclinico: new FormControl(data.historialClinico.idHClinico),
          examenessss: new FormControl(data.examenes.idExamenes),
          Tratamientos: new FormControl(data.tratamientos.idTratamientos),
          Recetas: new FormControl(data.recetas.idRecetas),

        });
      });
    }
  }
}