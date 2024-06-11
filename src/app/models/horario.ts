import { Cita } from "./cita";

export class HorarioMedico {
    idHMedico: number = 0
    fechaHMedico: Date = new Date();
    estadoHMedico: string = ""
    cita: Cita = new Cita()
}
