import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'find-address', pathMatch: 'full' },
    { path: 'find-address', loadComponent: () => import('./find-address/find-address.component').then(m => m.FindAddressComponent) },
    { path: 'maps', loadComponent: () => import('./maps/maps.component').then(m => m.MapsComponent) },
    { path: '**', redirectTo: '/find-address' },
  ];