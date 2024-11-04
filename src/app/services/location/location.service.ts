import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/Location';
import { Observable, catchError, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  //metodo que retorna todos os localizações 
  getLocation(): Observable<Array<Location>>{
    return this.http.get<Array<Location>>(`${BACKEND_URL}/api/v1/location`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}
