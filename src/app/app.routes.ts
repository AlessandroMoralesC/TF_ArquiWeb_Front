import { RegistrarExamenesComponent } from './components/examenes/registrar-examenes/registrar-examenes.component';
import { Routes } from '@angular/router';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { RegistrarTratamientoComponent } from './components/tratamientos/registrar-tratamiento/registrar-tratamiento.component';
import { RecetaComponent } from './components/receta/receta.component';
import { RegistrarrecetaComponent } from './components/receta/registrarreceta/registrarreceta.component';
import { TipomaterialComponent } from './components/tipomaterial/tipomaterial.component';
import { RegistrarTipomaterialComponent } from './components/tipomaterial/registrar-tipomaterial/registrar-tipomaterial.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { LoginComponent } from './components/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrarusersComponent } from './components/users/registrarusers/registrarusers.component';
import { RegistrarrolesComponent } from './components/roles/registrarroles/registrarroles.component';
import { MetasComponent } from './components/metas/metas.component';
import { RegistrarmetasComponent } from './components/metas/registrarmetas/registrarmetas.component';
import { ComunidadesComponent } from './components/comunidades/comunidades.component';
import { RegistrarcomunidadesComponent } from './components/comunidades/registrarcomunidades/registrarcomunidades.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { RegistrarmaterialesComponent } from './components/materiales/registrarmateriales/registrarmateriales.component';
import { HistorialclinicosComponent } from './components/historialclinicos/historialclinicos.component';
import { RegistrarhistorialclinicosComponent } from './components/historialclinicos/registrarhistorialclinicos/registrarhistorialclinicos.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { RegistrarmensajesComponent } from './components/mensajes/registrarmensajes/registrarmensajes.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { RegistrarrespuestasComponent } from './components/respuestas/registrarrespuestas/registrarrespuestas.component';
import { DetallesclinicosComponent } from './components/detallesclinicos/detallesclinicos.component';
import { RegistrardetallesclinicosComponent } from './components/detallesclinicos/registrardetallesclinicos/registrardetallesclinicos.component';
import { CitasComponent } from './components/citas/citas.component';
import { RegistrarcitasComponent } from './components/citas/registrarcitas/registrarcitas.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { RegistrarhorariosComponent } from './components/horarios/registrarhorarios/registrarhorarios.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteTratamiento02Component } from './components/reportes/reporte-tratamiento02/reporte-tratamiento02.component';
import { ReporteTratamiento03Component } from './components/reportes/reporte-tratamiento03/reporte-tratamiento03.component';
import { ReporteTratamiento04Component } from './components/reportes/reporte-tratamiento04/reporte-tratamiento04.component';
import { ReportesTratamiento05Component } from './components/reportes/reportes-tratamiento05/reportes-tratamiento05.component';
import { ReportesTratamiento06Component } from './components/reportes/reportes-tratamiento06/reportes-tratamiento06.component';

export const routes: Routes = [
    { path: '', component: LandingpageComponent }, 
    { path: 'landing', component: LandingpageComponent },// Ruta por defecto
  { path: 'login', component: LoginComponent },
       /* {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },*/
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path:"roles",component: RolesComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarrolesComponent
            }, {
                path: 'ediciones/:id', component: RegistrarrolesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"usuarios",component:UsersComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarusersComponent
            }, {
                path: 'ediciones/:id', component: RegistrarusersComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
    {
        path: "tratamientos", component: TratamientosComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarTratamientoComponent
            }, {
                path: 'ediciones/:id', component: RegistrarTratamientoComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

    },
    {
        path: 'recetas', component: RecetaComponent,
        children: [
            { path: 'nuevo', component: RegistrarrecetaComponent },
            {
                path: 'ediciones/:id', component: RegistrarrecetaComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path: 'tipodematerial', component: TipomaterialComponent,
        children: [
            { path: 'nuevo', component: RegistrarTipomaterialComponent },
            {
                path: 'ediciones/:id', component: RegistrarTipomaterialComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

    },
    {
        path: 'examenes', component: ExamenesComponent,
        children: [
            { path: 'nuevo', component: RegistrarExamenesComponent },
            {
                path: 'ediciones/:id', component: RegistrarExamenesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

    },
    {
        path:"metas",component: MetasComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarmetasComponent
            }, {
                path: 'ediciones/:id', component: RegistrarmetasComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"comunidades",component: ComunidadesComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarcomunidadesComponent
            }, {
                path: 'ediciones/:id', component: RegistrarcomunidadesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"materiales",component: MaterialesComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarmaterialesComponent
            }, {
                path: 'ediciones/:id', component: RegistrarmaterialesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"historialclinicos",component: HistorialclinicosComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarhistorialclinicosComponent
            }, {
                path: 'ediciones/:id', component: RegistrarhistorialclinicosComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"mensajes",component: MensajesComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarmensajesComponent
            }, {
                path: 'ediciones/:id', component: RegistrarmensajesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"respuestas",component: RespuestasComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarrespuestasComponent
            }, {
                path: 'ediciones/:id', component: RegistrarrespuestasComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"detallesclinicos",component: DetallesclinicosComponent,
        children: [
            {
                path: 'nuevo', component: RegistrardetallesclinicosComponent
            }, {
                path: 'ediciones/:id', component: RegistrardetallesclinicosComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"citas",component: CitasComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarcitasComponent
            }, {
                path: 'ediciones/:id', component: RegistrarcitasComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:"horarios",component: HorariosComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarhorariosComponent
            }, {
                path: 'ediciones/:id', component: RegistrarhorariosComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

      },
      {
        path:'reporte',component:ReportesComponent,
        children: [
            {
              path: 'reporte02',
              component: ReporteTratamiento02Component
            },
            {
              path: 'reporte03',
              component: ReporteTratamiento03Component
            },
            {
                path: 'reporte04',
                component: ReporteTratamiento04Component
            },
            {
                path: 'reporte05',
                component: ReportesTratamiento05Component
            },
            {
                path: 'reporte06',
                component: ReportesTratamiento06Component
            },
          ]
      },
    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
      },
];
