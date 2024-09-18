import {Raspberry } from "./Raspberry";


export class Enviroment{
  id_enviroment: number = 0;
  enviroment_name: string = "";
  raspberry: Raspberry = new Raspberry();
  operative: boolean = false;
};
