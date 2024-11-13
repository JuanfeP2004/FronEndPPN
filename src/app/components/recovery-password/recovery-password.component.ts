import { Component } from '@angular/core';
import {CargarScriptsService} from "../../services/cargar-scripts.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent{

  constructor(_CargarScript:CargarScriptsService) {

   _CargarScript.Carga(['recovery/recovery']);

  }

  onRecovery(email: string): void {

    const jsonData = {
      email: email
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(jsonData));

    fetch("http://127.0.0.1:5000/RecuperarContrasenia", {
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
        alert('Se envio un correo a su cuenta de email, ahi puede recuperar la contraseña');
        //localStorage.setItem('loggedIn', 'true');
        //this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Hubo un problema con la solicitud:', error);
      });

  }
}
