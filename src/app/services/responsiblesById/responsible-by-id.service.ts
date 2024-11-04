import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponsible } from '../../models/DataResponsible';
import { BACKEND_URL } from '../../models/App';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleByEquipmentService {

  constructor(private http: HttpClient) {}


  getResponsiblesByEquipment(id: string = ''):Observable<Equipment>{
    return this.http.get<Equipment>(`${BACKEND_URL}/api/v1/equipmentresponsible/filter?id_equipment=${id}`);
  }

}
 