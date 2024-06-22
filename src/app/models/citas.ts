import { Users } from "./users"

export class Cita{
    idCita:number=0
    fechaCita:Date=new Date();
    motivoCita:string=""
    horaCita: string = "00:00:00";
    usuario:Users=new Users();
    
}