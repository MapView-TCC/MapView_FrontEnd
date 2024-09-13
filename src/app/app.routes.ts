import { Routes } from '@angular/router';
import { InicialComponent } from './pages/inicial/inicial.component';
import { HeaderComponent } from './components/header/header.component';
import { AmbienteComponent } from './pages/ambiente/ambiente.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { IventarioComponent } from './pages/iventario/iventario.component';

export const routes: Routes = [
    // {path: 'mapview',loadChildren:()=> import( './mapview/mapview.module').then(m=>m.MapviewModule)},

    {path:'', component:InicialComponent},
    {path:'header' , component:HeaderComponent},
    {path:'ambiente',component:AmbienteComponent},
    {path:'cadastro', component: CadastroComponent},
    {path:'historico', component:HistoricoComponent},
    {path:'iventario',component:IventarioComponent}
];
