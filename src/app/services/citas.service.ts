import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Cita } from '../models/citas';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private url=`${base_url}/citas`
  private listaCambio = new Subject<Cita[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Cita[]>(this.url);
  }
  insert(m: Cita) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Cita[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Cita>(`${this.url}/${id}`)
  }
  update(t:Cita){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
