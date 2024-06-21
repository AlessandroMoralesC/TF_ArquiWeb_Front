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
import { MaterialesComponent } from './components/materiales/materiales.component';
import { RegistrarmaterialesComponent } from './components/materiales/registrarmateriales/registrarmateriales.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { RegistrarmensajesComponent } from './components/mensajes/registrarmensajes/registrarmensajes.component';
import { ComunidadComponent } from './components/comunidad/comunidad.component';
import { RegistrarcomunidadComponent } from './components/comunidad/registrarcomunidad/registrarcomunidad.component';
import { RegistrarmetasComponent } from './components/meta/registrarmetas/registrarmetas.component';
import { MetaComponent } from './components/meta/meta.component';
import { HistorialclinicoComponent } from './components/historialclinico/historialclinico.component';
import { RegistrarhistorialclinicoComponent } from './components/historialclinico/registrarhistorialclinico/registrarhistorialclinico.component';
import { DetallehclinicoComponent } from './components/detallehclinico/detallehclinico.component';
import { RegistrardetallehclinicoComponent } from './components/detallehclinico/registrardetallehclinico/registrardetallehclinico.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
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
        path:"historialclinico",component:HistorialclinicoComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarhistorialclinicoComponent
            }, {
                path: 'ediciones/:id', component: RegistrarhistorialclinicoComponent
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
        path: "detalleclinico", component: DetallehclinicoComponent,
        children: [
            {
                path: 'nuevo', component: RegistrardetallehclinicoComponent
            }, {
                path: 'ediciones/:id', component: RegistrardetallehclinicoComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

    },
    {
        path: "comunidad", component: ComunidadComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarcomunidadComponent
            }, {
                path: 'ediciones/:id', component: RegistrarcomunidadComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno

    },
    {
        path: "metas", component: MetaComponent,
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
        path: "mensajes", component: MensajesComponent,
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
        path: 'materiales', component: MaterialesComponent,
        children: [
            { path: 'nuevo', component: RegistrarmaterialesComponent },
            {
                path: 'ediciones/:id', component: RegistrarmaterialesComponent
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
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
      },
];
