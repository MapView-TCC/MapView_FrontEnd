import { Post } from "./Post";
import { Enviroment } from "./Enviroment";

export class Location{
    id_location : string = "";
    post: Post = new Post();
    environment: Enviroment = new Enviroment();
    
}

export class LocationRegister{
    id_building: number =0;
    environment_name: string = '';
    id_area: number = 0 ;
    raspberry_name: string = '';
  }
  
  

