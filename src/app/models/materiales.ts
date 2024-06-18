import { TipoMaterial } from "./tipomaterial"
import { Usuario } from "./usuario"

export class Materiales
{
    idMateriales:number=0
    nombreMateriales:string=""
    usuario:Usuario=new Usuario()
    tipomaterial:TipoMaterial = new TipoMaterial()
}