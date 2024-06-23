import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Respuestas } from '../models/respuestas';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  private url=`${base_url}/respuestas`
  private listaCambio = new Subject<Respuestas[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Respuestas[]>(this.url);
  }
  insert(m: Respuestas) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Respuestas[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Respuestas>(`${this.url}/${id}`)
  }
  update(t:Respuestas){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
