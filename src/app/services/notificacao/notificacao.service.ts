import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrackingHistory } from '../../models/TrackingHistory';
import { BACKEND_URL } from '../../models/App';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private http: HttpClient) { }

  getHistoric(): Observable<Array<TrackingHistory>> {
    return this.http.get<Array< TrackingHistory>>(`${BACKEND_URL}/api/v1/trackingHistory`) //passar dinamicamnete
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
    
  }
}
