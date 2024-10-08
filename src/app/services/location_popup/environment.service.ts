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
  postEnvironment(userLog_id:number = 1, data: Forms_Register): Observable<Forms_Register> {
    return this.http.post <Forms_Register>(`${BACKEND_URL}/api/V1/registerEnvironment?userlog=${userLog_id}`, data ) 
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );

  }
}
