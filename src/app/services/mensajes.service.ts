import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Mensajes } from '../models/mensajes';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private url=`${base_url}/mensajes`
  private listaCambio = new Subject<Mensajes[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Mensajes[]>(this.url);
  }
  insert(m: Mensajes) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Mensajes[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Mensajes>(`${this.url}/${id}`)
  }
  update(t:Mensajes){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
