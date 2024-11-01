import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Enviroment } from '../../models/Enviroment';
import { BACKEND_URL } from '../../models/App.model';

@Injectable({
  providedIn: 'root'
})
export class DrpEnvironmentService {

  constructor(private http: HttpClient) { }

  getEnviroment(userLog_id: number = 1): Observable<Array<Enviroment>>{
    return this.http.get<Array<Enviroment>>(`${BACKEND_URL}/api/v1/environment?userLog_id=${userLog_id}`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}
