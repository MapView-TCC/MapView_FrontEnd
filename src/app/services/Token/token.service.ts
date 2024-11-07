import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Token } from '../../models/Token';
import { TOKEN } from '../../models/App';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }


  getCredentials(): Observable<any> {
    return this.http.get<any>(`/userinfo`).pipe(
      catchError(error => {
        console.error("Erro de requisição: ", error);
        return throwError(() => new Error("Algo está errado. Por favor, tente novamente mais tarde."));
      })
    );
  }
}
