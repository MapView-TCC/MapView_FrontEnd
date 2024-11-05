import { Injectable } from '@angular/core';
import { Client,Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs'
import { Observable,Subject } from 'rxjs';
import { TrackingHistory } from '../../models/TrackingHistory';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client!: Client;
  private notificationsSubject = new Subject<TrackingHistory>();

  notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect() {
    this.client = new Client({
      webSocketFactory: () => {
        return new SockJS('http://localhost:9000/connect'); // URL do SockJS
      },
      onConnect: () => {
        console.log('Connected to WebSocket via SockJS');
        this.client.subscribe('/topic/equip', (message: Message) => {
          const notification: TrackingHistory = JSON.parse(message.body);
          this.notificationsSubject.next(notification);
        });
      },
      onStompError: (frame) => {
        console.error('Error connecting to WebSocket:', frame);
      }
    });

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate(); // Fecha a conexão WebSocket
    }
  }


}
