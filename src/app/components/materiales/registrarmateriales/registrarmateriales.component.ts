import { UsersService } from './../../../services/users.service';
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
import { TipomaterialService } from '../../../services/tipomaterial.service';
import { Users } from '../../../models/users';
import { TipoMaterial } from '../../../models/tipomaterial';


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
  form: FormGroup;
  materiales: Materiales = new Materiales();
  listaUsuarios: Users[] = [];
  listaTiposMaterial: TipoMaterial[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private materialesService: MaterialesService,
    private usersService: UsersService,
    private tipoMaterialService: TipomaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idMateriales: [''],
      nombreMateriales: ['', Validators.required],
      usuario: ['', Validators.required],
      tipomaterial: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.usersService.list().subscribe(data => {
      this.listaUsuarios = data;
    });

    this.tipoMaterialService.list().subscribe(data => {
      this.listaTiposMaterial = data;
    });
  }

  registrarMaterial(): void {
    if (this.form.valid) {
      this.materiales.idMateriales = this.form.value.idMateriales;
      this.materiales.nombreMateriales = this.form.value.nombreMateriales;
      this.materiales.usuario = { id: this.form.value.usuario } as Users;
      this.materiales.tipoMaterial = { idTMaterial: this.form.value.tipomaterial } as TipoMaterial;

      if (this.edicion) {
        this.materialesService.update(this.materiales).subscribe(() => {
          this.materialesService.list().subscribe(data => {
            this.materialesService.setList(data);
          });
        });
      } else {
        this.materialesService.insert(this.materiales).subscribe(() => {
          this.materialesService.list().subscribe(data => {
            this.materialesService.setList(data);
          });
        });
      }

      this.router.navigate(['/materiales']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.materialesService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idMateriales: data.idMateriales,
          nombreMateriales: data.nombreMateriales,
          usuario: data.usuario.id,
          tipomaterial: data.tipoMaterial.idTMaterial
        });
      });
    }
  }
}