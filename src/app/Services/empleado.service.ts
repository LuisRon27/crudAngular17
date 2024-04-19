import { Injectable, inject } from '@angular/core';
import { environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../Interfaces/empleado';
import { ResponseAPI } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlApi: string = environment.apiEndpoint + 'Empleado';
  private http = inject(HttpClient);

  constructor() { }

  // Método GET para obtener todos
  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.urlApi);
  }

  // Método GET para obtener por ID
  getById(id: number): Observable<Empleado> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<Empleado>(url);
  }

  // Método POST para crear
  create(empledo: Empleado): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.urlApi, empledo);
  }

  // Método PUT para actualizar
  update(empledo: Empleado): Observable<ResponseAPI>  {
    const url = `${this.urlApi}`;
    return this.http.put<ResponseAPI>(url, empledo);
  }

  // Método DELETE para eliminar por ID
  delete(id: number): Observable<ResponseAPI> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<ResponseAPI>(url)
  }
}
