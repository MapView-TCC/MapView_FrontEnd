import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { BACKEND_URL} from '../../models/App.model';
import { Equipment, FilteredEquipment } from '../../models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  


  getEquipments( itens: String): Observable<FilteredEquipment[]> {
    return this.http.get<FilteredEquipment[]>(`${BACKEND_URL}/api/v1/equipment/search?searchTerm=${itens}`);
  }

  

}
