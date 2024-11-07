// src/app/interceptors/auth-interceptor.ts
import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageServiceService } from '../storageService/storage-service.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const storageService = inject(StorageServiceService);
    const authToken = storageService.getLocalStorage; // Método para obter o token

    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(modifiedReq);
};
