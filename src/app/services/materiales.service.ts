import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Materiales } from '../models/materiales';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MaterialesService {
  private url = `${base_url}/materiales`;
  private listaCambio = new Subject<Materiales[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Materiales[]>(this.url);
  }
  insert(p: Materiales) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Materiales[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Materiales>(`${this.url}/${id}`);
  }
  update(c: Materiales) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
