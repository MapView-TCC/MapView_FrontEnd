import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../models/User';
import { BACKEND_URL } from '../../models/App';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http:HttpClient) { }

  getCredentinals(token: String): Observable<Token>{
    return this.http.get<Token>(`${BACKEND_URL}/api`);
  }
}
