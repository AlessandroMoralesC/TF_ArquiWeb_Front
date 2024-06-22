import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { DetalleClinico } from '../models/detallesclinicos';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class DetalleclinicosService {

  private url=`${base_url}/detalleclinico`
  private listaCambio = new Subject<DetalleClinico[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<DetalleClinico[]>(this.url);
  }
  insert(m: DetalleClinico) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: DetalleClinico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<DetalleClinico>(`${this.url}/${id}`)
  }
  update(t:DetalleClinico){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
