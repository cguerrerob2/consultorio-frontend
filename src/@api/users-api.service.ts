import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  fechaNacimiento: string;
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  httpClient = inject(HttpClient)

  async getListUsers() {
    return lastValueFrom(this.httpClient.get<Usuario[]>('http://localhost:8080/login/'));
  }

  register(userData: Usuario): Observable<any> {
    const registerUrl = `http://localhost:8080/login/`; // Reemplaza con la ruta de registro en tu API
    return this.http.post(registerUrl, userData);
  }
}