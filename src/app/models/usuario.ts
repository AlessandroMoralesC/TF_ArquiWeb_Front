import { Rol } from "./rol"

export class Usuario{
    idUsers:number=0
    nombreUsers:string=""
    apellidoUsers:string=""
    fechanaciemientoUsers:Date=new Date()
    telefonoUsers:string=""
    correoUsers:string=""
    especialidadUsers:string=""
    username:string=""
    password:string=""
    enabled:boolean=false
}