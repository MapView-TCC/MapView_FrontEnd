import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Token } from '../../models/Token';
import { BACKEND_URL } from '../../models/App';
import { catchError } from 'rxjs';
import { StorageServiceService } from '../storageService/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient,private locastorage: StorageServiceService) { }

  getHistoric(): Observable<Array<TrackingHistory>> {

    
    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.get<Array< TrackingHistory>>(`${BACKEND_URL}/api/v1/trackingHistory`,{headers}) //passar dinamicamnete
    .pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(()=> new Error("Algo está errado."))
      })
    );
    
  }
}
