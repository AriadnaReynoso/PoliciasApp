import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidenciaDetallePage } from './incidencia-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: IncidenciaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenciaDetallePageRoutingModule {}
