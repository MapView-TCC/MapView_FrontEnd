import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponsible } from '../../models/DataResponsible';
import { BACKEND_URL } from '../../models/App';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/Equipment';
import { StorageServiceService } from '../storageService/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleByEquipmentService {

  constructor(private http: HttpClient, private localstorage: StorageServiceService) {}

  


  getResponsiblesByEquipment(id: string = ''):Observable<Equipment>{
    
    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.get<Equipment>(`${BACKEND_URL}/api/v1/equipmentresponsible/filter?id_equipment=${id}`,{headers});
  }

}
 