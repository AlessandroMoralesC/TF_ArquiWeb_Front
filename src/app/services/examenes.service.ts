import { Examenes } from './../models/examenes';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {
  private url=`${base_url}/examenes`
  private listaCambio = new Subject<Examenes[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Examenes[]>(this.url);
  }
  insert(m: Examenes) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Examenes[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Examenes>(`${this.url}/${id}`);
  }
  update(e:Examenes){
    return this.http.put(this.url,e);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`);
  }
}
