import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets/tickets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.css'
})
export class BoletosComponent  implements OnInit{
  boletos: any[] = [];
  error: string = '';

  constructor(private ticketsService: TicketsService) {}
  ngOnInit(): void {
    const usuarioId = localStorage.getItem('usuarioId');
    console.log('Usuario actual:', usuarioId); // 👈 asegurarse que no sea null

    this.ticketsService.obtenerBoletos().subscribe({
      next: (data) => {
        console.log('Boletos recibidos:', data); // 👈 revisar qué llega
        this.boletos = data.filter(boleto => boleto.usuarioId === usuarioId);
      },
      error: (err) => {
        this.error = 'No se pueden cargar los boletos. Vuelva a intentarlo después 😢';
      }
    });
  }
}