import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { AmbienteComponent } from '../pages/ambiente/ambiente.component';
import { CadastroComponent } from '../components/cadastro/cadastro.component';
import { HistoricoComponent } from '../pages/historico/historico.component';

const routes: Routes = [
    {path:'header' , component:HeaderComponent},
    {path:'ambiente',component:AmbienteComponent},
    {path:'cadastro', component: CadastroComponent},
    {path:'historico', component:HistoricoComponent},
    {path:'iventario',component:HistoricoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class MapviewRoutingModule{}