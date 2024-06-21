import { Historialclinico } from './historialclinico';
import { Examenes } from "./examenes"
import { Receta } from "./receta"
import { Tratamientos } from "./tratamientos"

export class DetalleHClinico
{
    idDHClinico:number=0
    descripcionDHClinico:string=""
    fechaDHClinico:Date=new Date()
    historialClinico:Historialclinico=new Historialclinico()
    recetas:Receta=new Receta()
    examenes:Examenes=new Examenes()
    tratamientos:Tratamientos=new Tratamientos()
}