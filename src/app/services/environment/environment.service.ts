import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';

import { Enviroment } from '../../models/Enviroment';
import { RegisterEnvironment } from '../../models/RegisterEnvironment';
import { StorageServiceService } from '../storageService/storage-service.service';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private http: HttpClient,private localstorage: StorageServiceService) {}

  //metodo que retorna todos os ambientes 
  getEnviroment(userLog_id: number = 1): Observable<Array<Enviroment>>{

    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.get<Array<Enviroment>>(`${BACKEND_URL}/api/v1/environment?userLog_id=${userLog_id}`,{headers})
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  //metodo para procurar um ambiente por id
  getEnvironmentById(id_environment: number = 1, userLog_id: number = 1): Observable<Enviroment>{

    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.get <Enviroment>(`${BACKEND_URL}/api/v1/environment/${id_environment}?userLog_id=${userLog_id}`,{headers} ) 
    .pipe(
      catchError(error => {
        console.error("Erro na requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  // Método para cadastrar um novo ambiente
  postEnvironment(userlog:number = 1, data: RegisterEnvironment): Observable<RegisterEnvironment> {

    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.post <RegisterEnvironment>(`${BACKEND_URL}/api/V1/registerEnvironment?userlog=${userlog}`, data,{headers} ) 
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );

  }
}
