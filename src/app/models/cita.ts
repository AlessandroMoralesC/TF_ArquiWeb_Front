import { Usuario } from "./usuario";

export class Cita{
    idCita:number=0
    fechaCita:Date=new Date();
    motivoCita:string=""
    horaCita:string=""
    usuario:Usuario=new Usuario()
}
