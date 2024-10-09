import {Raspberry } from "./Raspberry";

export class Enviroment{
  id_environment: number = 0;
  environment_name: string = "";
  raspberry: Raspberry = new Raspberry();
  operative: boolean = false;
};
