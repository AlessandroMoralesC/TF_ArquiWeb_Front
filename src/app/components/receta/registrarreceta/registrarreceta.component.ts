import { Component } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RecetaService } from '../../../services/receta.service';
import { ActivatedRoute,Params,Router,RouterLink } from '@angular/router';
import { Receta } from '../../../models/receta';


@Component({
  selector: 'app-registrarreceta',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule
    ,CommonModule,MatInputModule,MatButtonModule,MatSelectModule,
    MatDatepickerModule,MatNativeDateModule,RouterLink],
  templateUrl: './registrarreceta.component.html',
  styleUrl: './registrarreceta.component.css'
})

export class RegistrarrecetaComponent {
  form:FormGroup = new FormGroup({})
  receta:Receta = new Receta();
  id:number=0;
  edicion:boolean=false;
  constructor(
    private fomrBuilder: FormBuilder, 
    private rS:RecetaService, 
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init()
    })
    this.form = this.fomrBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }
  registrarReceta():void{
    if (this.form.valid) {
      this.receta.idRecetas=this.form.value.codigo;
      this.receta.nombreRecetas = this.form.value.nombre;
      this.receta.cantidadRecetas = this.form.value.cantidad;
      this.receta.observacionesRecetas = this.form.value.observaciones;
      if(this.edicion)
        {
            this.rS.update(this.receta).subscribe((data) => {
              this.rS.list().subscribe((data) => {
                this.rS.setlist(data);
              });
            });
        }else
        {
          this.rS.insert(this.receta).subscribe(() => {
            this.rS.list().subscribe((data) => {
              this.rS.setlist(data);
            });
          });
        }
        this.router.navigate(['/recetas']); 
    }
  }
  init()
  {
    if(this.edicion)
      {
        this.rS.listId(this.id).subscribe((data)=>
        {
          this.form = new FormGroup({
            codigo:new FormControl(data.idRecetas),
            nombre:new FormControl(data.nombreRecetas),
            cantidad:new FormControl(data.cantidadRecetas),
            observaciones:new FormControl(data.observacionesRecetas),
          })
        })
      }
  }
}
