import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenciaDetallePageRoutingModule } from './incidencia-detalle-routing.module';

import { IncidenciaDetallePage } from './incidencia-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidenciaDetallePageRoutingModule
  ],
  declarations: [IncidenciaDetallePage]
})
export class IncidenciaDetallePageModule {}
