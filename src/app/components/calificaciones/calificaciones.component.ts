import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

interface Calificacion {
  id?: number;
  titulo: string;
  descripcion: string;
  nota: number;
  fecha: Date;
}

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.css'
})
export class CalificacionesComponent {
  seccionActiva: string = 'lista';
  calificaciones: Calificacion[] = [];
  nuevaCalificacion: Calificacion = {
    titulo: '',
    descripcion: '',
    nota: 0,
    fecha: new Date()
  };

  constructor() {
    // Aquí podrías cargar las calificaciones desde un servicio
  }

  showSection(section: string): void {
    this.seccionActiva = section;
    if (section === 'nueva') {
      this.nuevaCalificacion = {
        titulo: '',
        descripcion: '',
        nota: 0,
        fecha: new Date()
      };
    }
  }

  agregarCalificacion(): void {
    if (this.nuevaCalificacion.titulo && this.nuevaCalificacion.nota) {
      this.calificaciones.unshift({
        ...this.nuevaCalificacion,
        id: this.calificaciones.length + 1
      });
      this.showSection('lista');
    }
  }

  eliminarCalificacion(id: number): void {
    this.calificaciones = this.calificaciones.filter(cal => cal.id !== id);
  }
}