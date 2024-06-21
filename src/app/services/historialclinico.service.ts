import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Historialclinico } from '../models/historialclinico';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class HistorialclinicoService {
  private url = `${base_url}/historialclinico`;
  private listaCambio = new Subject<Historialclinico[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Historialclinico[]>(this.url);
  }
  insert(p: Historialclinico) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Historialclinico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Historialclinico>(`${this.url}/${id}`);
  }
  update(c: Historialclinico) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
