import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cita {
  codigo: string;
  fecha: string; // Puedes cambiar este tipo según el formato que uses en tu backend
  hora: string; // Puedes cambiar este tipo según el formato que uses en tu backend
  estadoCita: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = 'http://localhost:8080/citas/';

  constructor(private http: HttpClient) {}

  getListCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  registerCita(citaData: Cita): Observable<any> {
    return this.http.post(this.apiUrl, citaData);
  }
  
}
