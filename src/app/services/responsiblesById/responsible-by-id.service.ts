import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponsible } from '../../models/DataResponsible';
import { BACKEND_URL } from '../../models/App';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleByIDService {

  constructor(private http: HttpClient) {}

  getResponsibleById(id: number = 1, userLogId: number = 1): Observable<DataResponsible> {
    return this.http.get<DataResponsible>(`${BACKEND_URL}/api/v1/responsible/${id}?userLog_id=${userLogId}`);
  }

}
