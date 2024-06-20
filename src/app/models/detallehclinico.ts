import { Examenes } from "./examenes"
import { historialclinico } from "./historialclinico"
import { Receta } from "./receta"
import { Tratamientos } from "./tratamientos"

export class DetalleHClinico
{
    idDHClinico:number=0
    descripcionDHClinico:string=""
    fechaDHClinico:Date=new Date()
    historialClinico:historialclinico=new historialclinico()
    recetas:Receta=new Receta()
    examenes:Examenes=new Examenes()
    tratamientos:Tratamientos=new Tratamientos()
}