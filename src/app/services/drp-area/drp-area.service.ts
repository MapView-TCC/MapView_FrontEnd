import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../../models/Area';
import { BACKEND_URL } from '../../models/App';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrpAreaService {

  constructor(private http: HttpClient) {}

  getArea(userLog_id: number = 0): Observable<Array<Area>>{
    return this.http.get<Array<Area>>(`${BACKEND_URL}/api/v1/area?userLog_id=${userLog_id}`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  };
}
