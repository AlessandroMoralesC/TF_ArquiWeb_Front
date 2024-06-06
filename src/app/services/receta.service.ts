import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Receta } from '../models/receta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private url=`${base_url}/recetas`
  private listaCambio = new Subject<Receta[]>
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Receta[]>(this.url);
  }
  insert(r:Receta){
    return this.http.post(this.url, r);
  }
  setlist(listaNueva:Receta[])
  {
    this.listaCambio.next(listaNueva);
  }
  getlist()
  {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Receta>(`${this.url}/${id}`)
  }
  update(r:Receta){
    return this.http.put(this.url,r)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
