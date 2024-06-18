import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Role } from '../models/roles';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private url=`${base_url}/roles`
  private listaCambio = new Subject<Role[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Role[]>(this.url);
  }
  insert(m: Role) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Role>(`${this.url}/${id}`)
  }
  update(t:Role){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
