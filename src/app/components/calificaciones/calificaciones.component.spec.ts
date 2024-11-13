import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificacionesComponent } from './calificaciones.component'; 

describe('CalificacionesComponent', () => {
  let component: CalificacionesComponent;
  let fixture: ComponentFixture<CalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionesComponent]  // Aquí importamos el componente CalificacionesComponent
    })
    .compileComponents();  // Compilamos los componentes necesarios

    fixture = TestBed.createComponent(CalificacionesComponent);  // Creamos la instancia del componente
    component = fixture.componentInstance;  // Asignamos la instancia del componente
    fixture.detectChanges();  // Detectamos los cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verificamos que el componente se haya creado correctamente
  });
});
