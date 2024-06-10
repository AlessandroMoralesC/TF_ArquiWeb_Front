import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { historialclinico } from '../models/historialclinico';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class HistorialclinicoService {
  private url = `${base_url}/historialclinico`;
  private listaCambio = new Subject<historialclinico[]>();

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<historialclinico[]>(this.url);
  }

  insert(m: historialclinico) {
    return this.http.post(this.url, m);
  }

  setList(listaNueva: historialclinico[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<historialclinico>(`${this.url}/${id}`);
  }

  update(e: historialclinico) {
    return this.http.put(this.url, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
