import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Register } from '../../models/Register';
import { BACKEND_URL } from '../../models/App';
import { StorageServiceService } from '../storageService/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,private localstorage:StorageServiceService) { }
  //Cadastro de novo equipamento
  postRegister(userLog_id: number = 1, data: Register): Observable<Register>{
    
    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    
    
    return this.http.post<Register>(`${BACKEND_URL}/api/v1/register?userLog_id=${userLog_id}`, data,{headers})
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        console.error("Erro na postagem: ", error.error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  //Atualização de dados do equipamento
  putRegister(userLog_id : number = 1, id_equipment: string, data: Register): Observable<Register>{
    return this.http.put<Register>(`${BACKEND_URL}api/v1/register?userLog_id=${userLog_id }&id_equipment=${id_equipment}`, data)
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  
}
