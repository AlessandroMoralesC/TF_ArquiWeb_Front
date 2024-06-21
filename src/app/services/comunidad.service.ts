import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comunidad } from '../models/comunidad';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComunidadService {
  private url = `${base_url}/comunidad`;
  private listaCambio = new Subject<Comunidad[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Comunidad[]>(this.url);
  }
  insert(p: Comunidad) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Comunidad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Comunidad>(`${this.url}/${id}`);
  }
  update(c: Comunidad) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
