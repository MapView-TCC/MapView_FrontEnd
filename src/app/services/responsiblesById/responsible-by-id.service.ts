import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponsible } from '../../models/DataResponsible';
import { BACKEND_URL } from '../../models/App.model';
import { Observable } from 'rxjs';
import { ResponsibleFilter } from '../../models/ResponsibleFilter';
import { Responsible } from '../../models/Responsible';
import { Equipment } from '../../models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleByIDService {

  constructor(private http: HttpClient) {}

  getResponsibles(page: number = 0,itens: number=1, id: number =1 ):Observable<ResponsibleFilter[]>{
    return this.http.get<ResponsibleFilter[]>(`${BACKEND_URL}/api/v1/equipmentresponsible/filter?page=${page}&itens${itens}`);
  }

  getResponsiblesByEquipment(page: number = 0,itens: number=1, id: string = ''):Observable<Equipment>{
    return this.http.get<Equipment>(`${BACKEND_URL}/api/v1/equipmentresponsible/filter?page=${page}&itens${itens}&id_equipment=${id}`);
  }

}
