import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { BACKEND_URL} from '../../models/App';
import { Equipment } from '../../models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  constructor(private http: HttpClient) {}

  getEquipments(page: number = 0, id:  number=1): Observable<Equipment[]> {
      return this.http.get<Equipment[]>(`${BACKEND_URL}/api/v1/equipment?page=${page}&itens=100&userLog_id=${id}`); // Ajuste o endpoint
  }

  deleteEquipment(equipment: string, id: number = 1): Observable<Equipment[]> {
    return this.http.put<Equipment[]>(`${BACKEND_URL}/api/v1/equipment/inactivate/${equipment}?userLog_id=${id}`, {});
  }
  
  
}