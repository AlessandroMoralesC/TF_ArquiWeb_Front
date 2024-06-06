import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url=`${base_url}/roles`
  private ListaCambio= new Subject<Rol[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Rol[]>(this.url);
  }
  insert(r:Rol) {
    return this.http.post(this.url,r);
  }
  setList(listaNueva:Rol[]) {
    this.ListaCambio.next(listaNueva);
  }
  getList() {
    return this.ListaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Rol>(`${this.url}/${id}`)
  }
  update(r:Rol){
    return this.http.put(this.url,r)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
