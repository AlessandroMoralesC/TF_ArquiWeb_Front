import { RegistrarExamenesComponent } from './components/examenes/registrar-examenes/registrar-examenes.component';
import { Routes } from '@angular/router';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { RegistrarTratamientoComponent } from './components/tratamientos/registrar-tratamiento/registrar-tratamiento.component';
import { RolComponent } from './components/rol/rol.component';
import { CreaeditarolComponent } from './components/rol/creaeditarol/creaeditarol.component';
import { RecetaComponent } from './components/receta/receta.component';
import { RegistrarrecetaComponent } from './components/receta/registrarreceta/registrarreceta.component';
import { TipomaterialComponent } from './components/tipomaterial/tipomaterial.component';
import { RegistrarTipomaterialComponent } from './components/tipomaterial/registrar-tipomaterial/registrar-tipomaterial.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistrarusuarioComponent } from './components/usuario/registrarusuario/registrarusuario.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { RegistrarmensajesComponent } from './components/mensajes/registrarmensajes/registrarmensajes.component';

import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { RegistrarRespuestaComponent } from './components/respuesta/registrar-respuesta/registrar-respuesta.component';
import { HistorialclinicoComponent } from './components/historialclinico/historialclinico.component';
import { RegistrarHistorialclinicoComponent } from './components/historialclinico/registrar-historialclinico/registrar-historialclinico.component';
import { MetasComponent } from './components/metas/metas.component';
import { RegistrarmetasComponent } from './components/metas/registrarmetas/registrarmetas.component';
import { CitaComponent } from './components/cita/cita.component';
import { RegistrarCitaComponent } from './components/cita/registrar-cita/registrar-cita.component';
import { HorarioComponent } from './components/horario/horario.component';
import { RegistrarHorarioComponent } from './components/horario/registrar-horario/registrar-horario.component';
import { LoginComponent } from './components/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { RegistrarmaterialesComponent } from './components/materiales/registrarmateriales/registrarmateriales.component';
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
        path: 'roles', component: RolComponent,
        children: [
            {
                path: 'nuevo', component: CreaeditarolComponent
            }, {
                path: 'ediciones/:id', component: CreaeditarolComponent
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
        ]
    },
    {
        path: 'examenes', component: ExamenesComponent,
        children: [
            { path: 'nuevo', component: RegistrarExamenesComponent },
            {
                path: 'ediciones/:id', component: RegistrarExamenesComponent
            }
        ]
    },
    {
        path: 'usuarios', component: UsuarioComponent,
        children: [
            { path: 'nuevo', component: RegistrarusuarioComponent },
            { path: 'ediciones/:id', component: RegistrarusuarioComponent }
        ]
    },
    {
        path: 'respuestas', component: RespuestaComponent,
        children: [
            { path: 'nuevo', component: RegistrarRespuestaComponent },
            { path: 'ediciones/:id', component: RegistrarRespuestaComponent }
        ]
    },
    {
        path: 'historialclinico', component: HistorialclinicoComponent,
        children: [
            { path: 'nuevo', component: RegistrarHistorialclinicoComponent },
            { path: 'ediciones/:id', component: RegistrarHistorialclinicoComponent }
        ]
    },
    {
        path: "metas", component: MetasComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarmetasComponent
            }, {
                path: 'ediciones/:id', component: RegistrarmetasComponent
            }
        ]
    },
    {
        path: "citas", component: CitaComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarCitaComponent
            }, {
                path: 'ediciones/:id', component: RegistrarCitaComponent
            }
        ]
    },
    {
        path: "materiales", component: MaterialesComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarmaterialesComponent
            }, {
                path: 'ediciones/:id', component: RegistrarmaterialesComponent
            }
        ]
    },
    {
        path: "detalleclinico", component: DetallehclinicoComponent,
        children: [
            {
                path: 'nuevo', component: RegistrardetallehclinicoComponent
            }, {
                path: 'ediciones/:id', component: RegistrardetallehclinicoComponent
            }
        ]
    },
    {
        path: "horariomedico", component: HorarioComponent,
        children: [
            {
                path: 'nuevo', component: RegistrarHorarioComponent
            }, {
                path: 'ediciones/:id', component: RegistrarHorarioComponent
            }
        ]
    },
    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
      },
];
