import { Cita } from "./cita";

export class HorarioMedico {
    idHorario: number = 0
    fechaHorario: Date = new Date();
    estadoHorario: string = ""
    idCita: Cita = new Cita()
}
