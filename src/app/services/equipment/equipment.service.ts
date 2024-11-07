import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { BACKEND_URL} from '../../models/App';
import { Equipment} from '../../models/Equipment';
import { StorageServiceService } from '../storageService/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  constructor(private http: HttpClient, private localstorage:StorageServiceService) {}

  //Retorna todos os equipamentos 
  getEquipments(page: number = 0, itens: number = 200, id: number = 1): Observable<Equipment[]> {

    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.get<Equipment[]>(`${BACKEND_URL}/api/v1/equipment?page=${page}&itens=${itens}&userLog_id=${id}`,{headers});
  }
  
  //Deleta o equipamento pelo id
  deleteEquipment(equipment: string, id: number = 1): Observable<Equipment[]> {
    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.put<Equipment[]>(`${BACKEND_URL}/api/v1/equipment/inactivate/${equipment}?userLog_id=${id}`, {headers});
  }
  
}