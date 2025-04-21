import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent {

  titulo = '';
  fecha = '';
  hora = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.titulo = params['titulo'] || '';
      this.fecha = params['fecha'] || '';
      this.hora = params['hora'] || '';
    });
  }

  volver() {
    this.router.navigate(['/peliculas']);
  }
}