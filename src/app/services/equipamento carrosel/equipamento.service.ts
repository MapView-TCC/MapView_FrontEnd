import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { Equipment } from '../../models/Equipment';
import { BACKEND_URL } from '../../models/App';


@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) {}

  getEquipamentos(): Observable<Array<Equipment>> {
    return this.http.get<Array< Equipment>>(`${BACKEND_URL}/api/v1/trackingHistory/wronglocations?id_enviromet=3`) //passar dinamicamnete
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
    
  }
}