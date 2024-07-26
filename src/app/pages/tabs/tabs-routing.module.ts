import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../incidencias/incidencias.module').then(m => m.IncidenciasPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../incidencia-detalle/incidencia-detalle.module').then(m => m.IncidenciaDetallePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../acerca-de/acerca-de.module').then(m => m.AcercaDePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
