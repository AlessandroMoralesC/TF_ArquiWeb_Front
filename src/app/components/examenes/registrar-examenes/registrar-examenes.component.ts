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
import { Examenes } from '../../../models/examenes';
import { ExamenesService } from '../../../services/examenes.service';

@Component({
  selector: 'app-registrar-examenes',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,RouterLink],
  templateUrl: './registrar-examenes.component.html',
  styleUrl: './registrar-examenes.component.css'
})
export class RegistrarExamenesComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  Examen: Examenes=new Examenes();
  id:number=0;
  edicion:boolean=false;
  constructor(
    private formBuilber: FormBuilder,
    private eS: ExamenesService,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init()
    })
    this.form = this.formBuilber.group({
      codigo: [''],
      nombre: ['', Validators.required],
      fechaexamen: ['', Validators.required],
      resultado: ['', Validators.required],
      observaciones: ['', Validators.required],

    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.Examen.idExamenes=this.form.value.codigo;
      this.Examen.nombreExamenes = this.form.value.nombre;
      this.Examen.fechaExamenes = this.form.value.fechaexamen;
      this.Examen.resultadosExamenes = this.form.value.resultado;
      this.Examen.observacionesExamenes = this.form.value.observaciones;
      if(this.edicion)
        {
            this.eS.update(this.Examen).subscribe((data) => {
              this.eS.list().subscribe((data) => {
                this.eS.setList(data);
              });
            });
        }else
        {
          this.eS.insert(this.Examen).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }
      this.router.navigate(['/examenes']);
    }
  }
  init()
  {
    if(this.edicion)
      {
        this.eS.listId(this.id).subscribe((data)=>
        {
          this.form = new FormGroup({
            codigo:new FormControl(data.idExamenes),
            nombre:new FormControl(data.nombreExamenes),
            fechaexamen:new FormControl(data.fechaExamenes),
            resultado:new FormControl(data.resultadosExamenes),
            observaciones:new FormControl(data.observacionesExamenes)
          })
        })
      }
  }
}
