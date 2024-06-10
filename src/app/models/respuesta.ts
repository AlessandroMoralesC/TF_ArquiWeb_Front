import { Usuario } from "./usuario"

export class Respuesta {
    idRespuesta: number = 0;
    pregunta: string = "";
    respuestas: string = "";
    usuario: Usuario = new Usuario();
}
