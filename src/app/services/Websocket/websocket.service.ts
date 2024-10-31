import { Injectable } from '@angular/core';
import { Client,Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client'
import { Observable,Subject } from 'rxjs';
import { TrackingHistory } from '../../models/TrackingHistory';
import { NotificationsAlert } from '../../models/NotificationsAlert';

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
        return new SockJS(''); // URL do SockJS
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

