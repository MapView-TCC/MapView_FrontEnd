import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment, EquipmentIventario } from '../../models/Equipment';
import { BACKEND_URL } from '../../models/App.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentByIDService {

  constructor(private http: HttpClient) {}

  getEquipmentById(id: string = '', userLogId: number = 1): Observable<EquipmentIventario> {
    return this.http.get<EquipmentIventario>(`${BACKEND_URL}/api/v1/equipment/${id}?userLog_id=${userLogId}`);
  }
  
}
