import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { BACKEND_URL } from '../../models/App';
import { WrongLocation } from '../../models/WrongLocation';


@Injectable({
  providedIn: 'root'
})
export class CarrosselService {

  constructor(private http: HttpClient) {}

  getEquipamentos(id: number=1): Observable<Array<WrongLocation>> {
    return this.http.get<Array<WrongLocation>>(`${BACKEND_URL}/api/v1/trackingHistory/wronglocations?id_environment=${id}`) //passar dinamicamnete
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
    
  }
}