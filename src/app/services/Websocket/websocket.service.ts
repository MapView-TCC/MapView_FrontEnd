import { Injectable,NgZone } from '@angular/core';
import { Client,Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs'
import { Observable,Subject } from 'rxjs';
import { TrackingHistory } from '../../models/TrackingHistory';
import { NotificationsAlert } from '../../models/NotificationsAlert';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client | null=null;
  private notificationsSubject = new Subject<TrackingHistory>();

  notifications$ = this.notificationsSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.connect();
  }

  connect(){
    if(this.client && this.client.connected){
      console.log("Websocket ja esta conectado");
      return;
    }
    this.client = new Client({
      webSocketFactory: () =>  new SockJS('http://localhost:9000/connect'), // URL do SockJS
      onConnect: () => {
        console.log('Connected to WebSocket via SockJS');
        this.client?.subscribe('/equip', (message: Message) => {
          const notification: TrackingHistory = JSON.parse(message.body);
          this.ngZone.run(() => this.notificationsSubject.next(notification))
        });
      },
      onStompError: (frame) => {
        console.error('Error connecting to WebSocket:', frame);
      }
    });

    try {
      this.client.activate();
      console.log('Tentando ativar a conexão WebSocket...');
    } catch (error) {
      console.error('Erro ao ativar a conexão WebSocket:', error);
    }
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate(); // Fecha a conexão WebSocket
      console.log('FECHANDO A CONEXAO');
    }
    this.client = null;
  }


}

