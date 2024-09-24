import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { Equipment } from '../../models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  private apiUrl = 'http://10.234.82.71:8082'; 
  
  constructor(private http: HttpClient) {}



  getEquipamentos(): Observable<Array<Equipment>> {
    console.log(this.http.get<Array< Equipment>>(`${this.apiUrl}/api/v1/equipment/filter?page=0&itens=10&enviroment=Environment%201`))
    return this.http.get<Array< Equipment>>(`${this.apiUrl}/api/v1/equipment/filter?page=0&itens=10&enviroment=Environment%201`)
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
    
  }
}