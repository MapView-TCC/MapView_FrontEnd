import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BuildingDrp } from '../../models/BuldingDrp';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})

export class BuildingDrpService {

  constructor(private http: HttpClient) {}

  getBulding(page: number = 0): Observable<Array<BuildingDrp>>{
    return this.http.get<Array<BuildingDrp>>(`${BACKEND_URL}/api/v1/building?page=${page}&items=10&userLog_id=1`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  };


}