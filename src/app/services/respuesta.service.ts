import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private url = `${base_url}/respuestas`;
  private listaCambio = new Subject<Respuesta[]>();

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Respuesta[]>(this.url);
  }

  insert(m: Respuesta) {
    return this.http.post(this.url, m);
  }

  setList(listaNueva: Respuesta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Respuesta>(`${this.url}/${id}`);
  }

  update(e: Respuesta) {
    return this.http.put(this.url, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
