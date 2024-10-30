import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND_URL } from '../../models/App';
import { LocationRegister } from '../../models/Location';
import { Enviroment } from '../../models/Enviroment';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private http: HttpClient) {}


  //metodo para pprocurar um ambiente por id
  getEnvironmentById(id_environment: number = 1, userLog_id: number = 1): Observable<Enviroment>{
    return this.http.get <Enviroment>(`${BACKEND_URL}/api/v1/environment/${id_environment}?userLog_id=${userLog_id}` ) 
    .pipe(
      catchError(error => {
        console.error("Erro na requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
  }

  // Método para cadastrar um novo ambiente
  postEnvironment(userlog:number = 1, data: LocationRegister): Observable<LocationRegister> {
    return this.http.post <LocationRegister>(`${BACKEND_URL}/api/V1/registerEnvironment?userlog=${userlog}`, data ) 
    // return this.http.post<Forms_Register>(`${BACKEND_URL}/api/V1/registerEnvironment?id_building=39&id_area=1&environment_name=Laborat%C3%B3rio%2009&raspberry_name=RP009&userlog=1`, {} ) 
    
    .pipe(
      catchError(error => {
        console.error("Erro na postagem: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );

  }
}
