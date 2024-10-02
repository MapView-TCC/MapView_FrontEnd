import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  showDialog = false;
  showFormlog = false;
  showCarroselog = false;
  showLocationlog = false;


  constructor() { }

}
