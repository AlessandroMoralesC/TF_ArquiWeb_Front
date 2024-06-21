import { UsersService } from './../../../services/users.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { Users } from '../../../models/users';
import { Historialclinico } from '../../../models/historialclinico';
import { HistorialclinicoService } from '../../../services/historialclinico.service';


@Component({
  selector: 'app-registrarhistorialclinico',
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
  templateUrl: './registrarhistorialclinico.component.html',
  styleUrl: './registrarhistorialclinico.component.css'
})
export class RegistrarhistorialclinicoComponent implements OnInit{
  form: FormGroup;
  hclinico: Historialclinico = new Historialclinico();
  listaUsuarios: Users[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private hclinicoService: HistorialclinicoService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idHClinico: [''],
      fechaperturaHClinico: ['', Validators.required],
      usuario: ['', Validators.required]
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
  }

  registrarHClinico(): void {
    if (this.form.valid) {
      this.hclinico.idHClinico = this.form.value.idHClinico;
      this.hclinico.fechaperturaHClinico = this.form.value.fechaperturaHClinico;
      this.hclinico.usuario = { id: this.form.value.usuario } as Users;

      if (this.edicion) {
        this.hclinicoService.update(this.hclinico).subscribe(() => {
          this.hclinicoService.list().subscribe(data => {
            this.hclinicoService.setList(data);
          });
        });
      } else {
        this.hclinicoService.insert(this.hclinico).subscribe(() => {
          this.hclinicoService.list().subscribe(data => {
            this.hclinicoService.setList(data);
          });
        });
      }

      this.router.navigate(['/historialclinico']);
    }
  }

  private initForm(): void {
    if (this.edicion) {
      this.hclinicoService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idHClinico: data.idHClinico,
          fechaperturaHClinico: data.fechaperturaHClinico,
          usuario: data.usuario.id
        });
      });
    }
  }
}
