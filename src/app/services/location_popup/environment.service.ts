import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';
import { Forms_Register } from '../../models/Forms_Register';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private http: HttpClient) {}

  // Método para cadastrar um novo ambiente
  postEnvironment(userlog:number = 1, data: Forms_Register): Observable<Forms_Register> {
    return this.http.post <Forms_Register>(`${BACKEND_URL}/api/V1/registerEnvironment?userlog=${userlog}`, data ) 
    // return this.http.post<Forms_Register>(`${BACKEND_URL}/api/V1/registerEnvironment?id_building=39&id_area=1&environment_name=Laborat%C3%B3rio%2009&raspberry_name=RP009&userlog=1`, {} ) 
    
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );

  }
}
