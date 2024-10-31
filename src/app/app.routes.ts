import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EnvironmentComponent } from './pages/environment/environment.component';
import { HistoryComponent } from './pages/history/history.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { RegisterComponet } from './pages/register/register.component';

export const routes: Routes = [
    // {path: 'mapview',loadChildren:()=> import( './mapview/mapview.module').then(m=>m.MapviewModule)},

    {path:'', component:HomeComponent},
    {path:'ambiente',component:EnvironmentComponent},
    {path:'cadastro', component: RegisterComponet},
    {path:'historico', component:HistoryComponent},
    {path:'inventario',component:InventoryComponent}
];
