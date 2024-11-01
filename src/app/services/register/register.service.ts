import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Register, RegisterUpdate } from '../../models/Register';
import { BACKEND_URL } from '../../models/App.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  //Cadastro de novo equipamento
  postRegister(userLog_id: number = 1, data: Register): Observable<Register>{
    return this.http.post<Register>(`${BACKEND_URL}/api/v1/register?userLog_id=${userLog_id}`, data)
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        console.error("Erro na postagem: ", error.error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  //Atualização de dados do equipamento
  putRegister(userLog_id : number = 1, id_equipment: string, data: RegisterUpdate): Observable<RegisterUpdate>{
    return this.http.put<Register>(`${BACKEND_URL}api/v1/register?userLog_id=${userLog_id }&id_equipment=${id_equipment}`, data)
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  
}
