import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DetalleHClinico } from '../models/detallehclinico';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DetallehclinicoService {
  private url = `${base_url}/detalleclinico`;
  private listaCambio = new Subject<DetalleHClinico[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<DetalleHClinico[]>(this.url);
  }
  insert(p: DetalleHClinico) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: DetalleHClinico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<DetalleHClinico>(`${this.url}/${id}`);
  }
  update(c: DetalleHClinico) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
