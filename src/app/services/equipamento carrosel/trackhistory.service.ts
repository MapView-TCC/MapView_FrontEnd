import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { BACKEND_URL } from '../../models/App';
import { Track_History } from '../../models/Track_History';


@Injectable({
  providedIn: 'root'
})
export class trackhistoryService {

  constructor(private http: HttpClient) {}

  getEquipamentos(id: number=1): Observable<Array<Track_History>> {
    return this.http.get<Array<Track_History>>(`${BACKEND_URL}/api/v1/trackingHistory/wronglocations?id_enviromet=${id}`) //passar dinamicamnete
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
    
  }
}