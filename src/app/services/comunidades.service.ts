import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Comunidad } from '../models/comunidades';
import { Role } from '../models/roles';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})

export class ComunidadesService {

  private url=`${base_url}/comunidad`
  private listaCambio = new Subject<Comunidad[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Comunidad[]>(this.url);
  }
  insert(m: Comunidad) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Comunidad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Comunidad>(`${this.url}/${id}`)
  }
  update(t:Comunidad){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
