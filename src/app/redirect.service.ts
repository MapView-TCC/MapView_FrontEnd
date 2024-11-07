import { Injectable } from '@angular/core';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) {}

  // Método para redirecionar para uma rota interna
  redirectTo(url: string): void {
    this.router.navigate([url]); // Navega para a URL interna
  }

  // Método para redirecionar para uma URL externa
  redirectToExternal(url: string): void {
    window.location.href = url; // Redireciona para uma URL externa
  }
}
