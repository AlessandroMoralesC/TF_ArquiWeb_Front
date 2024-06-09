import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Tratamientos} from '../models/tratamientos';
import { HttpClient} from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  private url=`${base_url}/tratamientos`
  private listaCambio = new Subject<Tratamientos[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tratamientos[]>(this.url);
  }
  insert(m: Tratamientos) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Tratamientos[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Tratamientos>(`${this.url}/${id}`)
  }
  update(t:Tratamientos){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
