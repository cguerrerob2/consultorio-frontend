import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmailSubject = new BehaviorSubject<string | null>(null);

  get userEmail$(): Observable<string | null> {
    return this.userEmailSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // Guarda en localstorage el correo electrónico del usuario y la contraseña
    localStorage.setItem('userEmail', credentials.email);
    localStorage.setItem('password', credentials.password);

    const loginUrl = `http://localhost:8080/login/`;
    return this.http.post(loginUrl, credentials).pipe(
      tap((response: any) => {
        // Almacena el correo electrónico del usuario al iniciar sesión
        this.userEmailSubject.next(response.email);
      })
    );
  }
}