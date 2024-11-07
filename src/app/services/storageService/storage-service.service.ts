import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }


  localStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setSessionStorage(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  // Obter dados
  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  getSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  // Remover dados
  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  removeSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Limpar todo o armazenamento
  clearLocalStorage(): void {
    localStorage.clear();
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
