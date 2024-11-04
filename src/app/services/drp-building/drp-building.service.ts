import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';
import { Building } from '../../models/Building';

@Injectable({
  providedIn: 'root'
})

export class DrpBuildingService {

  constructor(private http: HttpClient) {}

  getBulding(userLog_id: number = 1): Observable<Array<Building>>{
    return this.http.get<Array<Building>>(`${BACKEND_URL}/api/v1/building?userLog_id=${userLog_id}`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  };


}
