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
import { TipoMaterial } from '../../../models/tipomaterial';
import { TipomaterialService } from '../../../services/tipomaterial.service';

@Component({
  selector: 'app-registrar-tipomaterial',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,RouterLink],
  templateUrl: './registrar-tipomaterial.component.html',
  styleUrl: './registrar-tipomaterial.component.css'
})
export class RegistrarTipomaterialComponent implements OnInit{
  form: FormGroup = new FormGroup({}); 
  TipodeMaterial: TipoMaterial=new TipoMaterial();
  id:number=0;
  edicion:boolean=false;

  listatipos: { value: string; viewValue: string }[] = [
    { value: 'Video', viewValue: 'Video' },
    { value: 'Documento', viewValue: 'Documento' },
    { value: 'Receta', viewValue: 'Receta' },
  ];
  constructor(
    private formBuilber: FormBuilder,
    private ts: TipomaterialService,
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
      tema: ['', Validators.required],
      tipodematerial: ['', Validators.required],
      link: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.TipodeMaterial.idTMaterial = this.form.value.codigo;
      this.TipodeMaterial.temaTMaterial = this.form.value.tema;
      this.TipodeMaterial.tipoTMaterial = this.form.value.tipodematerial;
      this.TipodeMaterial.linkTMaterial = this.form.value.link;
      if(this.edicion)
        {
            this.ts.update(this.TipodeMaterial).subscribe((data) => {
              this.ts.list().subscribe((data) => {
                this.ts.setList(data);
              });
            });
        }else{
          this.ts.insert(this.TipodeMaterial).subscribe((data) => {
            this.ts.list().subscribe((data) => {
              this.ts.setList(data);
            });
          });
        }
      this.router.navigate(['tipodematerial']);
    }
  }
  init() {
    if (this.edicion) {
      this.ts.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTMaterial),
          tema: new FormControl(data.temaTMaterial),
          tipodematerial: new FormControl(data.tipoTMaterial),
          link: new FormControl(data.linkTMaterial),
        });
      });
    }
  }
}
