// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/@api/auth.service';
import { UsersApiService } from 'src/@api/users-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credenciales: any = {
    correo: '',
    password: ''
  };
  public loginSuccess = false;
  public loginError = false;
  public loginForm!:FormGroup;
  public isAdmin = false;

  constructor(
    private usersApiService: UsersApiService,
    private router: Router, 
    private fb:FormBuilder, 
    private authService: AuthService,
  ) {}

  private createLoginForm(): FormGroup {
    return this.fb.group({
      correo: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
    console.log(this.usersApiService.getListUsers());
    
  }

  async login() {
    try {
      const users = await this.usersApiService.getListUsers();
      
      for (let i = 0; i < users.length; i++) {
        if (
          this.credenciales.correo === users[i].correo &&
          this.credenciales.password === users[i].password
        ) {
          // Resto del código...
          localStorage.setItem('userEmail', this.credenciales.correo);
          localStorage.setItem('password', this.credenciales.password);
  
          this.loginSuccess = true;
          setInterval(() => {
            // this.router.navigate(['/home']);
            this.loginSuccess = false;
          }, 1000);
        } else {
          // Datos incorrectos
          setInterval(() => {
            this.loginError = true;
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  }
  
  
}
