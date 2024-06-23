import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Materiales } from '../models/materiales';
import { CantidadDeMaterialporNombreDTO } from '../models/cantidadDeMaterialporNombreDTO';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  private url=`${base_url}/materiales`
  private listaCambio = new Subject<Materiales[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Materiales[]>(this.url);
  }
  insert(m: Materiales) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Materiales[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Materiales>(`${this.url}/${id}`)
  }
  update(t:Materiales){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  
}
