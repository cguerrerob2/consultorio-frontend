import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';
import { UsersApiService, Usuario } from 'src/@api/users-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nuevoUsuario: Usuario = {
    id: 0,
    nombre: '',
    apellidos: '',
    sexo: '',
    fechaNacimiento: '',
    correo: '',
    password: '',
  };

  constructor(
    private usersApiService: UsersApiService, 
    private router: Router
  ) {}

  public registerSuccess = false;
  public registerError = false;

  registrarUsuario() {
    this.usersApiService.register(this.nuevoUsuario)
      .subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);
          
          // Envia al usuario al dashboard
          this.registerSuccess = true;
          setInterval(() => {
            this.router.navigate(['/home']);
            this.registerSuccess = false;
          }, 1000);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);

          this.registerError = true;
          setInterval(() => {
            this.registerError = false;
          }, 1000);

          if (error.error instanceof ErrorEvent) {
            console.log('Ocurrió un error en el cliente.');
          } else {
            console.log('Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.');
          }
        }
      );
  }
  
}
