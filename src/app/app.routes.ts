import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'mapview',loadChildren:()=> import( './mapview/mapview.module').then(m=>m.MapviewModule)}
];
