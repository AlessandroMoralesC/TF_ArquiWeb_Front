import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Historialclinico } from '../models/historialclinicos';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class HistorialclinicosService {

  private url=`${base_url}/historialclinico`
  private listaCambio = new Subject<Historialclinico[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Historialclinico[]>(this.url);
  }
  insert(m: Historialclinico) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Historialclinico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Historialclinico>(`${this.url}/${id}`)
  }
  update(t:Historialclinico){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
