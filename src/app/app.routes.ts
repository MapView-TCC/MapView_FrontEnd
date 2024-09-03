import { Routes } from '@angular/router';
import { InicialComponent } from './mapview/inicial/inicial.component';
import { HeaderComponent } from './mapview/header/header.component';
import { AmbienteComponent } from './mapview/ambiente/ambiente.component';
import { CadastroComponent } from './mapview/cadastro/cadastro.component';
import { HistoricoComponent } from './mapview/historico/historico.component';
import { IventarioComponent } from './mapview/iventario/iventario.component';

export const routes: Routes = [
    // {path: 'mapview',loadChildren:()=> import( './mapview/mapview.module').then(m=>m.MapviewModule)},

    {path:'', component:InicialComponent},
    {path:'header' , component:HeaderComponent},
    {path:'ambiente',component:AmbienteComponent},
    {path:'cadastro', component: CadastroComponent},
    {path:'historico', component:HistoricoComponent},
    {path:'iventario',component:IventarioComponent}
];
