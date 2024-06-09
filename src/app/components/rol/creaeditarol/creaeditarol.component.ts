import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Rol } from '../../../models/rol';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatSelectModule],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css'
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  rol: Rol = new Rol();
  id:number=0;
  edicion:boolean=false;

  listaroles: { value: string; viewValue: string }[] = [
    { value: 'Paciente', viewValue: 'Paciente' },
    { value: 'Psicologo', viewValue: 'Psicologo' },
    { value: 'Administrador', viewValue: 'Administrador' }
  ];
  constructor(
    private formbuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init()
    })

    this.form = this.formbuilder.group({
      codigo: [''],
      rol: ['', Validators.required]
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.idRol=this.form.value.codigo;
      this.rol.nombreRol = this.form.value.rol;
      if(this.edicion)
        {
            this.rS.update(this.rol).subscribe((data) => {
              this.rS.list().subscribe((data) => {
                this.rS.setList(data);
              });
            });
        }else{
          this.rS.insert(this.rol).subscribe((data) => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data)
            })
          })
        }
      this.router.navigate(['/roles/nuevo'])
    }
  }
  init()
  {
    if(this.edicion)
      {
        this.rS.listId(this.id).subscribe((data)=>
        {
          this.form = new FormGroup({
            codigo:new FormControl(data.idRol),
            rol:new FormControl(data.nombreRol) 
          })
        })
      }
  }
}
