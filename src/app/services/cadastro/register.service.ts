import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Register } from '../../models/Register';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  postRegister(userLog_id: number = 1, data: Register): Observable<Register>{
    return this.http.post<Register>(`${BACKEND_URL}/api/v1/register?userLog_id=${userLog_id}`, data)
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }
}
