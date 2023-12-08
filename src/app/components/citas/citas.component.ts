import { Component } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Cita, CitasService } from 'src/@api/citas.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent {
  fecha: string = '';
  hora: string = '';
  citas: Cita[] = [];
  citasPorHora: { [hora: string]: Cita[] } = {};

  constructor(private citasService: CitasService) { }

  isOpen = false;

  public loginSuccess = false;
  public loginError = false;

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  guardarCita() {
    // Verifica que la fecha y la hora no estén vacías antes de guardar
    if (this.fecha && this.hora) {
      // Asegúrate de que la hora tenga el formato "HH:mm:ss"
      const formattedHora = `${this.hora}:00`;

      const nuevaCita = {
        codigo: '',
        fecha: this.fecha,
        hora: formattedHora,
        estadoCita: 'PENDIENTE'
      };

      // Llama al método del servicio para guardar la cita
      this.citasService.registerCita(nuevaCita).subscribe(
        response => {
          console.log('Cita guardada exitosamente:', response);
          this.loginSuccess = true; // Marca como inicio de sesión exitoso
          this.toggleModal(); // Cierra el modal
          setTimeout(() => {
            this.loginSuccess = false; // Marca como inicio de sesión exitoso
          }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades
        },
        error => {
          console.error('Error al guardar la cita:', error);
        }
      );
    } else {
      // Puedes mostrar un mensaje al usuario indicando que debe completar la fecha y la hora
      console.error('Debe completar la fecha y la hora.');
      this.loginError = true; // Marca como inicio de sesión fallido
      this.toggleModal(); // Cierra el modal
      setTimeout(() => {
        this.loginError = false; // Marca como inicio de sesión fallido
      }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades
    }
  }

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
