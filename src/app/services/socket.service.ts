import { Injectable } from '@angular/core';
import io from 'socket.io-client'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Coordinates } from '../interfaces/Coordinates';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io(`${environment.serverUrl}${environment.gitUser}`, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket:', this.socket.id);
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Error de conexión con el servidor de socket:', error);
    });
  }

  sendLocation(coordinates: Coordinates): void {
    console.log('Emitiendo ubicación:', coordinates);
    this.socket.emit('newLocation', coordinates);
  }

  getNewLocation(): Observable<Coordinates> {
    return new Observable(observer => {
      this.socket.on('newLocation', (data: Coordinates) => {
        console.log('Ubicación recibida desde el servidor:', data);
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    this.socket.disconnect();
    console.log('Conexión de socket desconectada');
  }
}
