import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../types/movies';
import { MoviesService } from '../../services/movies/movies.service';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets/tickets.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  error: string = '';
  showForm: boolean = false;
  selectedPeliculaId: string = '';
  fecha: string = '';
  hora: string = '';
  editando: boolean = false;
  peliculaEditada: Pelicula = {
    id: '',
    titulo: '',
    descripcion: '',
    imagen: '',
    anio: 0, 
    precio: {
      moneda: '',
      real: 0
    }
  };
peli: any;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.cargarPeliculas();
    this.moviesService.cargarPeliculasDesdeJSON(); 
  }

  cargarPeliculas() {
    this.moviesService.getPeliculas().subscribe({
      next: (data) => this.peliculas = data,
      error: () => this.error = 'No se puede cargar la película. Vuelva a intentarlo después 😢',
    });
  }

  mostrarFormulario(peliculaId: string) {
    this.selectedPeliculaId = peliculaId;
    this.showForm = true;
  }

  ocultarFormulario() {
    this.showForm = false;
  }

  comprarBoleto(peli: any) {
    console.log("Botón presionado", peli);
    this.router.navigate(['/confirmacion'], {
      queryParams: {
        titulo: peli.titulo,
        fecha: this.fecha,
        hora: this.hora
      }
    });
  }
  
  
  editarPelicula(peli: Pelicula) {
    this.router.navigate(['/peliculas-from', peli.id]);
  }
  

  guardarCambios() {
    if (this.peliculaEditada.id) {
      this.moviesService.actualizarPelicula(this.peliculaEditada.id, this.peliculaEditada)
        .then(() => {
          alert('Película actualizada con éxito 🎉');
          this.editando = false;
          this.cargarPeliculas();
        });
    }
  }

  cancelarEdicion() {
    this.editando = false;
  }

  eliminarPelicula(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.moviesService.eliminarPelicula(id).then(() => {
        alert('Película eliminada 🗑');
        this.cargarPeliculas();
      });
    }
  }
  confirmarCompra() {
    const peli = this.peliculas.find(p => p.id === this.selectedPeliculaId);
    if (peli) {
      this.router.navigate(['/confirmacion'], {
        queryParams: {
          titulo: peli.titulo,
          fecha: this.fecha,
          hora: this.hora
        }
      });
    } else {
      alert('Película no encontrada 😢');
    }
  }
  
}