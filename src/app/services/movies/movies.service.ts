import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../../types/movies';
import { collection, collectionData, addDoc, Firestore, doc, updateDoc, deleteDoc, getDocs, setDoc, docData } from '@angular/fire/firestore';  // Asegúrate de importar Firestore
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://jritsqmet.github.io/web-api/peliculas3.json';

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getMovie(): Observable<Pelicula[]> {
    return this.http.get<{ peliculas: Pelicula[] }>(this.url).pipe(
      map(response => response.peliculas)
    );
  }

  getPeliculas(): Observable<Pelicula[]> {
    const peliculasRef = collection(this.firestore, 'peliculas');
    return collectionData(peliculasRef, { idField: 'id' }) as Observable<Pelicula[]>;
  }

  insertarPeliculaConId(peli: Pelicula) {
    const peliculasRef = collection(this.firestore, 'peliculas');
    return getDocs(peliculasRef).then(snapshot => {
      const maxId = snapshot.docs.reduce((max, doc) => {
        const data = doc.data();
        return Math.max(max, Number(data['id']));
      }, 0);
      peli.id = (maxId + 1).toString();
      const nuevaPeliculaRef = doc(this.firestore, 'peliculas', peli.id);
      return setDoc(nuevaPeliculaRef, peli);
    });
  }

  getPeliculaPorId(id: string): Observable<Pelicula> {
    const peliculaRef = doc(this.firestore, `peliculas/${id}`);
    return docData(peliculaRef) as Observable<Pelicula>;
  }

  actualizarPelicula(id: string, peli: Partial<Pelicula>) {
    const peliculaDoc = doc(this.firestore, `peliculas/${id}`);
    return updateDoc(peliculaDoc, peli);
  }

  eliminarPelicula(id: string) {
    const peliculaDoc = doc(this.firestore, `peliculas/${id}`);
    return deleteDoc(peliculaDoc);
  }

  cargarPeliculasDesdeJSON() {
    this.getMovie().subscribe(peliculas => {
      peliculas.forEach(peli => {
        const peliRef = doc(this.firestore, 'peliculas', peli.id.toString());
        setDoc(peliRef, peli);
      });
    });``
  }
  
}