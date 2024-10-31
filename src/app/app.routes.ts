import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EnvironmentComponent } from './pages/environment/environment.component';
import { HistoryComponent } from './pages/history/history.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { RegisterComponet } from './pages/register/register.component';

export const routes: Routes = [
    // {path: 'mapview',loadChildren:()=> import( './mapview/mapview.module').then(m=>m.MapviewModule)},

    {path:'', component:HomeComponent},
    {path:'environment',component:EnvironmentComponent},
    {path:'register', component: RegisterComponet},
    {path:'history', component:HistoryComponent},
    {path:'inventory',component:InventoryComponent}
];
