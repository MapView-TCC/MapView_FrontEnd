import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HistoricoComponent } from './historico/historico.component';

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