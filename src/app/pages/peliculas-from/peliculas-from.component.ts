import { Component } from '@angular/core';
import { Pelicula } from '../../types/movies';
import { MoviesService } from '../../services/movies/movies.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas-from',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './peliculas-from.component.html',
  styleUrl: './peliculas-from.component.css'
})
export class PeliculasFromComponent {
  form: FormGroup;
  id: string = "";

  constructor(
    private moviesService: MoviesService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      descripcion: [""],
      imagen: [""],
      anio: [new Date().getFullYear(), [Validators.required]],
      moneda: ["USD", [Validators.required]],
      real: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (!this.id) return;

      this.moviesService.getPeliculaPorId(this.id).subscribe(pelicula => {
        this.form.patchValue({
          titulo: pelicula.titulo,
          descripcion: pelicula.descripcion,
          imagen: pelicula.imagen,
          anio: pelicula.anio,
          moneda: pelicula.precio.moneda,
          real: pelicula.precio.real
        });
      });
    });
  }

  addMovie() {
    if (this.form.invalid) return;

    const movie: Pelicula = {
      id: '',
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen: this.form.value.imagen,
      anio: this.form.value.anio,
      precio: {
        moneda: this.form.value.moneda,
        real: this.form.value.real
      }
    };

    this.moviesService.insertarPeliculaConId(movie)
      .then(() => this.router.navigate(["/peliculas"]))
      .catch(err => console.error(err));
  }

  updateMovie() {
    if (this.form.invalid) return;

    const movie: Pelicula = {
      id: this.id,
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen: this.form.value.imagen,
      anio: this.form.value.anio,
      precio: {
        moneda: this.form.value.moneda,
        real: this.form.value.real
      }
    };

    this.moviesService.actualizarPelicula(this.id, movie)
    .then(() => this.router.navigate(["/peliculas"]))
      .catch(err => console.error(err));
  }
  editarPelicula(peli: Pelicula) {
    this.router.navigate(['/peliculas-from', peli.id]);
  }
}