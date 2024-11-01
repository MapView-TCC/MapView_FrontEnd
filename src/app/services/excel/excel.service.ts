import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { BACKEND_URL} from '../../models/App.model';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = `${BACKEND_URL}/api/v1/excel`;


  constructor(private http: HttpClient) {}

  exportToExcel() {
    return this.http.get(this.apiUrl, { 
      responseType: 'blob',
      headers: { 'Accept': 'application/vnd.ms-excel' } // ou 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  }
  

  downloadExcel(blob: Blob, fileName: string) {
    const file = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // ou 'application/vnd.ms-excel'
    saveAs(file, fileName);
  }
  
  
}
