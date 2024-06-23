import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { TipoMaterial } from '../models/tipomaterial';
import { CantidadDeMaterialporNombreDTO } from '../models/cantidadDeMaterialporNombreDTO';
import { CantidadDeMaterialPorTipoDTO } from '../models/cantidadDeMaterialporTipo';
import { ListadoVideosTipoDTO } from '../models/listadovideotipoDTO';
import { ListadoFiltrarMaterialesDTO } from '../models/listadofilttrarmaterialesDTO';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TipomaterialService {
  private url=`${base_url}/tipomaterial`
  private listaCambio = new Subject<TipoMaterial[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TipoMaterial[]>(this.url);
  }
  insert(m: TipoMaterial) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: TipoMaterial[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TipoMaterial>(`${this.url}/${id}`)
  }
  update(t:TipoMaterial){
    return this.http.put(this.url,t)
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  getCantidadDeMaterialporNombre():Observable<CantidadDeMaterialporNombreDTO[]>
  {
    return this.http.get<CantidadDeMaterialporNombreDTO[]>(`${this.url}/CantidadMaterialPorNombreDTO`);
  }
  getCantidaddeMaterialporTipo():Observable<CantidadDeMaterialPorTipoDTO[]>
  {
    return this.http.get<CantidadDeMaterialPorTipoDTO[]>(`${this.url}/CantidadMaterialPorTipoDTO`);
  }
  getlistadovideos():Observable<ListadoVideosTipoDTO[]>
  {
    return this.http.get<ListadoVideosTipoDTO[]>(`${this.url}/ListadoVideosTipo`);
  }
  getlistamaterial():Observable<ListadoFiltrarMaterialesDTO[]>
  {
    return this.http.get<ListadoFiltrarMaterialesDTO[]>(`${this.url}/ListadoFiltrarMateriales`);
  }
}
