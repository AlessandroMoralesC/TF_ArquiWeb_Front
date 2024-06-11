import { Usuario } from "./usuario";

export class Cita{
    idCita:number=0
    fechaCita:Date=new Date();
    motivoCita:string=""
    horaCita:number=0
    idUsuario:Usuario=new Usuario()
    estadoCita:string=""
}
