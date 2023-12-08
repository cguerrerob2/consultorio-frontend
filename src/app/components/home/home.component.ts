import { Component, OnInit } from '@angular/core';
import { CitasService, Cita } from 'src/@api/citas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  citas: Cita[] = [];
  citasPorHora: { [hora: string]: Cita[] } = {};

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de citas
    this.citasService.getListCitas().subscribe(
      (data) => {
        this.citas = data;
        this.organizarCitasPorHora();
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }

  private organizarCitasPorHora() {
    // Organiza las citas por hora
    this.citasPorHora = {};

    this.citas.forEach((cita) => {
      const hora = cita.hora;
      if (!this.citasPorHora[hora]) {
        this.citasPorHora[hora] = [];
      }
      this.citasPorHora[hora].push(cita);
    });
  }

  // Puedes agregar más métodos y lógica según tus necesidades

  // Método para obtener las claves de las horas
  getHoras(): string[] {
    return Object.keys(this.citasPorHora);
  }

  // Método para obtener las citas para una hora específica
  getCitasPorHora(hora: string): Cita[] {
    return this.citasPorHora[hora] || [];
  }
}
