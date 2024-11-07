import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackingHistory } from '../../models/TrackingHistory';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageServiceService } from '../storageService/storage-service.service';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class TrackingHistoryService {

  constructor(private http: HttpClient,
                          private localstorage: StorageServiceService) { }

  getTrackingHistory(): Observable<Array<TrackingHistory>> {

    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.get<Array<TrackingHistory>>(`${BACKEND_URL}/api/v1/trackingHistory`,{headers})
      .pipe(
        catchError(error => {
          console.error("Erro de requisição: ", error);
          return throwError(() => new Error("Algo está errado."))
        })
      );
  }
}
