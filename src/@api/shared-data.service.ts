// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cita {
  codigo: string;
  fecha: string; // Puedes cambiar este tipo según el formato que uses en tu backend
  hora: string; // Puedes cambiar este tipo según el formato que uses en tu backend
  estadoCita: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedCita: BehaviorSubject<Cita | null> = new BehaviorSubject<Cita | null>(null);

  setSelectedCita(cita: Cita | null) {
    this.selectedCita.next(cita);
  }

  getSelectedCita(): Observable<Cita | null> {
    return this.selectedCita.asObservable();
  }

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  setAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }
}
