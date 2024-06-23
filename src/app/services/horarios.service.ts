import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { HorarioMedico } from '../models/horarios';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private url=`${base_url}/horariomedico`
  private listaCambio = new Subject<HorarioMedico[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<HorarioMedico[]>(this.url);
  }
  insert(m: HorarioMedico) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: HorarioMedico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<HorarioMedico>(`${this.url}/${id}`)
  }
  update(t:HorarioMedico){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
