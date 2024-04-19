import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Interfaces/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private empleadoServicio = inject(EmpleadoService);
  public listaEmpleados: Empleado[] = [];
  public displayedColumns: string[] = ["Id", "NombreCompleto", "Correo", "Sueldo", "FechaContrato", "Acciones"];


  obtenerEmpleados() {
    this.empleadoServicio.getAll().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaEmpleados = data;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  constructor(private router: Router) { 
    this.obtenerEmpleados();
  }

  Crear() {
    this.router.navigate(['/Empleado', 0]);
  }

  Editar(objeto: Empleado) {
    this.router.navigate(['/Empleado', objeto.idEmpleado]);

  }

  Eliminar(objeto: Empleado) {
    if (confirm("Desea Eliminar el Empleado" + objeto.nombreCompleto)) {
      this.empleadoServicio.delete(objeto.idEmpleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados()
          }
        }, error: (err) => {
          alert("No se Pudo Eliminar");
        }
      })
    }
  }
}
