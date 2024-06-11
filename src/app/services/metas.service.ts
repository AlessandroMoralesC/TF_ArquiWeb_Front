import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Meta } from '../models/metas';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  private url=`${base_url}/metas`
  private listaCambio = new Subject<Meta[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Meta[]>(this.url);
  }
  insert(m: Meta) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Meta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Meta>(`${this.url}/${id}`)
  }
  update(e:Meta){
    return this.http.put(this.url,e)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}