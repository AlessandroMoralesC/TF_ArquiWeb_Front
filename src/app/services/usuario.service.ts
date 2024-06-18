import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Usuario[]>(this.url);
  }
  insert(p: Usuario) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Usuario>(`${this.url}/${id}`);
  }
  update(c: Usuario) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
