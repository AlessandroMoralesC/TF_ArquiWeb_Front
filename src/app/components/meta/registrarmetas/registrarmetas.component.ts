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
import { Meta } from '../../../models/meta';
import { MetaService } from '../../../services/meta.service';

@Component({
  selector: 'app-registrarmetas',
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
  templateUrl: './registrarmetas.component.html',
  styleUrl: './registrarmetas.component.css'
})
export class RegistrarmetasComponent implements OnInit {
  form: FormGroup;
  meta: Meta = new Meta();
  listaUsuarios: Users[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private metaService: MetaService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idMeta: [''],
      estadoMeta: ['', Validators.required],
      nombreMeta: ['', Validators.required],
      descripcionMeta: ['', Validators.required],
      usuario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.usersService.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  registrarMeta(): void {
    if (this.form.valid) {
      this.meta.idMeta = this.form.value.idMeta;
      this.meta.estadoMeta = this.form.value.estadoMeta;
      this.meta.nombreMeta = this.form.value.nombreMeta;
      this.meta.descripcionMeta = this.form.value.descripcionMeta;
      this.meta.usuario = { id: this.form.value.usuario } as Users;

      if (this.edicion) {
        this.metaService.update(this.meta).subscribe(() => {
          this.metaService.list().subscribe(data => {
            this.metaService.setList(data);
          });
        });
      } else {
        this.metaService.insert(this.meta).subscribe(() => {
          this.metaService.list().subscribe(data => {
            this.metaService.setList(data);
          });
        });
      }

      this.router.navigate(['/metas/nuevo']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.metaService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idMeta: data.idMeta,
          estadoMeta: data.estadoMeta,
          nombreMeta: data.nombreMeta,
          descripcionMeta: data.descripcionMeta,
          usuario: data.usuario.id
        });
      });
    }
  }
}
