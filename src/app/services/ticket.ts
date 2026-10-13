import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id: number;
  asunto: string;
  descripcion: string;
  fecha_creacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://127.0.0.1:8000/api/tickets/';

  constructor(private http: HttpClient) {}

  obtenerTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }
}