import { Users } from "./users"

export class CitaDTO {
    idCita: number = 0
    fechaCita: Date = new Date()
    motivoCita: string = ""
    horaCita: Date = new Date()
    usuario: Users = new Users()
}
