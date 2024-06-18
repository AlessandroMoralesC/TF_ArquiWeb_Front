import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Materiales } from '../../../models/materiales';
import { MaterialesService } from '../../../services/materiales.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TipomaterialService } from '../../../services/tipomaterial.service';


@Component({
  selector: 'app-registrarmateriales',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './registrarmateriales.component.html',
  styleUrl: './registrarmateriales.component.css'
})
export class RegistrarmaterialesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  materiales: Materiales = new Materiales();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  usuarios: any[] = [];
  tiposMaterial: any[] = [];

  constructor(
    private mS: MaterialesService,
    private uS: UsuarioService,
    private tmS: TipomaterialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idMateriales: [''],
      nombreMateriales: ['', Validators.required],
      usuario: ['', Validators.required],
      tipomaterial: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });

    this.tmS.list().subscribe((data) => {
      this.tiposMaterial = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.materiales.idMateriales = this.form.value.idMateriales;
      this.materiales.nombreMateriales = this.form.value.nombreMateriales;
      this.materiales.usuario.idUsers = this.form.value.usuario;
      this.materiales.tipomaterial.idTMaterial = this.form.value.tipomaterial;
      
      if (this.edicion) {
        this.mS.update(this.materiales).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.materiales).subscribe((data) => {
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
          idMateriales: new FormControl(data.idMateriales),
          nombreMateriales: new FormControl(data.nombreMateriales),
          usuario: new FormControl(data.usuario.idUsers),
          tipomaterial: new FormControl(data.tipomaterial.idTMaterial),
        });
      });
    }
  }
}
