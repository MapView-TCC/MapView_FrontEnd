import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Enviroment } from '../../models/Enviroment';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class EnviromentDrpService {

  constructor(private http: HttpClient) { }

  getEnviroment(page: number = 0): Observable<Array<Enviroment>>{
    return this.http.get<Array<Enviroment>>(`${BACKEND_URL}/api/v1/enviroment?page=${page}&itens=10&userLog_id=1`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}
