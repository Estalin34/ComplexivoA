import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore, getDocs, query, where } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private firestore: Firestore,private auth:Auth) {}

 // Comprar boleto
 async comprarBoleto(peliculaId: string, fecha: string, hora: string) {
  const user = await this.auth.currentUser; // ✅ IMPORTANTE usar await
  if (!user) return;

  const boletosRef = collection(this.firestore, 'boletos');
  await addDoc(boletosRef, {
    peliculaId,
    fecha,
    hora,
    usuarioId: user.uid // ✅ se guarda el usuario
  });
}

// Obtener boletos comprados
obtenerBoletos(): Observable<any[]> {
  const boletosRef = collection(this.firestore, 'boletos');

  return from(getDocs(boletosRef).then((querySnapshot) => {
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data // ✅ aseguramos que tenga peliculaId, usuarioId, fecha, hora
      };
    });
  }));
}
}