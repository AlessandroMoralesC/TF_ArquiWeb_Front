import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Tratamientos} from '../models/tratamientos';
import { HttpClient} from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  private url = `${base_url}/tratamientos`;
  private listaCambio = new Subject<Tratamientos[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Tratamientos[]>(this.url);
  }
  insert(p: Tratamientos) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Tratamientos[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Tratamientos>(`${this.url}/${id}`);
  }
  update(c: Tratamientos) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
