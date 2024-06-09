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

export const routes: Routes = [
    
    {
        path:"tratamientos",component:TratamientosComponent,
        children:[
            {
                path:'nuevo',component:RegistrarTratamientoComponent
            },{
                path:'ediciones/:id',component:RegistrarTratamientoComponent
            }
        ]
    },
    {
        path:"mensajes",component:MensajesComponent,
        children:[
            {
                path:'nuevo',component:RegistrarmensajesComponent
            },{
                path:'ediciones/:id',component:RegistrarmensajesComponent
            }
        ]
    },
    {
        path:'roles',component:RolComponent,
        children:[
            {
                path:'nuevo',component:CreaeditarolComponent
            },{
                path:'ediciones/:id',component:CreaeditarolComponent
            }
        ]
    },
    {
        path:'recetas',component:RecetaComponent,
        children:[
            {path:'nuevo',component:RegistrarrecetaComponent} ,
            {
                path:'ediciones/:id',component:RegistrarrecetaComponent
            }   
        ]
    },
    {
        path:'tipodematerial',component:TipomaterialComponent,
        children:[
            {path:'nuevo',component:RegistrarTipomaterialComponent},
            {
                path:'ediciones/:id',component:RegistrarTipomaterialComponent
            }  
        ]
    },
    {
        path:'examenes',component:ExamenesComponent,
        children:[
            {path:'nuevo',component:RegistrarExamenesComponent},
            {
                path:'ediciones/:id',component:RegistrarExamenesComponent
            }  
        ]
    },
    {
        path:'usuarios',component:UsuarioComponent,
        children: [
            { path: 'nuevo', component: RegistrarusuarioComponent
             },
            { path: 'ediciones/:id', component: RegistrarusuarioComponent },

        ]
    }

];
