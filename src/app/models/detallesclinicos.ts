import { Examenes } from "./examenes";
import { Historialclinico } from "./historialclinicos";
import { Receta } from "./receta";
import { Tratamientos } from "./tratamientos";


export class DetalleClinico{
    idDHClinico:number=0
    descripcionDHClinico:string=""
    fechaDHClinico:Date=new Date();
    recetas:Receta=new Receta();
    examenes:Examenes=new Examenes();
    tratamientos:Tratamientos=new Tratamientos();
    historialClinico:Historialclinico=new Historialclinico();
}   
