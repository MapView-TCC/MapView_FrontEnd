import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { BACKEND_URL} from '../../models/App';
import { FilteredEquipment } from '../../models/FilteredEquipment';
import { StorageServiceService } from '../storageService/storage-service.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private localstorage:StorageServiceService) { }

  getEquipments( itens: String): Observable<FilteredEquipment[]> {
    
    const token= this.localstorage.getLocalStorage("id_token");
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;


    return this.http.get<FilteredEquipment[]>(`${BACKEND_URL}/api/v1/equipment/search?searchTerm=${itens}`,{headers});
  }

  

}
