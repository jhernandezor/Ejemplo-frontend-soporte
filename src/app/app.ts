import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { TicketService, Ticket } from './services/ticket';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe],
  templateUrl: './app.html',
  styleUrls: []
})
export class App implements OnInit {
  tickets: any[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketService.obtenerTickets().subscribe({
      next: (datos: any) => {
        console.log('DATOS QUE RECIBE ANGULAR:', datos);

        // Si Django devuelve una lista directa:
        if (Array.isArray(datos)) {
          this.tickets = datos;
        } 
        // Si Django devuelve un objeto como { "tickets": [...] } o { "data": [...] }:
        else if (datos && Array.isArray(datos.tickets)) {
          this.tickets = datos.tickets;
        } else if (datos && Array.isArray(datos.data)) {
          this.tickets = datos.data;
        }

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'No se pudo conectar con el backend de Django.';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}