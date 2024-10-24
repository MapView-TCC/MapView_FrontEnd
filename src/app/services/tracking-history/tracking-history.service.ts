import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackingHistory, Historico } from '../../models/TrackingHistory';
import { Observable, catchError, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class TrackingHistoryService {

  constructor(private http: HttpClient) { }

  getTrackingHistory(): Observable<Array<TrackingHistory>>{
    return this.http.get<Array<TrackingHistory>>(`${BACKEND_URL}/api/v1/trackingHistory`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(): Observable<Array<Historico>>{
    return this.http.get<Array<Historico>>(`${BACKEND_URL}/api/v1/trackingHistory`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}
