import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  getArea() {
    throw new Error('Method not implemented.');
  }
  getEnvironment() {
    throw new Error('Method not implemented.');
  }
  getBuilding() {
    throw new Error('Method not implemented.');
  }
  
  showDialog = false;
  showFormlog = false;
  showCarroselog = false;
  showLocationlog = false;
  showFilterlog = false;


  constructor() { }

}
