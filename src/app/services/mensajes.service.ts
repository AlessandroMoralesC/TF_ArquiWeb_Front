import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mensajes } from '../models/mensaje';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private url = `${base_url}/mensajes`;
  private listaCambio = new Subject<Mensajes[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Mensajes[]>(this.url);
  }
  insert(p: Mensajes) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Mensajes[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Mensajes>(`${this.url}/${id}`);
  }
  update(c: Mensajes) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}
