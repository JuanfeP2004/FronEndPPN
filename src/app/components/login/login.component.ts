import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CargarScriptsService} from "../../services/cargar-scripts.service";

@Component({
  selector    : 'app-login',
  standalone  : true,
  imports: [
    RouterLink
  ],
  templateUrl : './login.component.html',
  styleUrl    : './login.component.css'

})
export class LoginComponent{

  constructor(_CargarScript:CargarScriptsService, private router: Router) {

    _CargarScript.Carga(['login/login']);

  }
  passwordError: string | null = null;

  onLogin(email: string, password: string): void {

    const jsonData = {
      email: email,
      contrasenia: password
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(jsonData));


    fetch("http://127.0.0.1:5000/IniciarSesion", {
      method: 'POST',  // Cambiado a POST
      body: formData,  // Enviar los datos como JSON
    })
      .then((response) => {
        if (!response.ok) {
          alert('Error: ' + response.status);  // Mostrar el error
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        alert('Respuesta del servidor: ' + JSON.stringify(data));
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  }

  onSignup(fullName: string, email: string, password: string): void {
    /*const storedUsers = JSON.parse(<string>localStorage.getItem('users')) || [];
    const existingUser = storedUsers.find((u: { email: string; }) => u.email === email);

    if (existingUser) {
      alert('El usuario ya está registrado.');
    } else if (!this.validatePassword(password)) {
      this.passwordError = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y caracteres especiales.';
    } else {
      storedUsers.push({ fullName, email, password });
      localStorage.setItem('users', JSON.stringify(storedUsers));
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.passwordError = null; // Limpia el mensaje de error
    }*/

    const jsonData = {
      nombre: fullName, 
      email: email,
      contrasenia: password,
      universidad: "Universidad Pontificia Bolivariana",
      rol: "usuario"
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(jsonData));


    fetch("http://127.0.0.1:5000/CrearUsuario", {
      method: 'POST',  // Cambiado a POST
      body: formData,  // Enviar los datos como JSON
    })
      .then((response) => {
        if (!response.ok) {
          alert('Error: ' + response.status);  // Mostrar el error
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      })
      .catch((error) => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  }

  validatePassword(password: string): boolean {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
