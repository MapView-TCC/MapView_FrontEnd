import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackingHistory } from '../../models/TrackingHistory';
import { Observable, catchError, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class TrackingHistoryService {

  constructor(private http: HttpClient) { }

  getTrackingHistory(page: number = 0, itens: number = 200): Observable<Array<TrackingHistory>>{
    return this.http.get<Array<TrackingHistory>>(`${BACKEND_URL}/api/v1/trackingHistory?page=${page}&itens=${itens}`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}
