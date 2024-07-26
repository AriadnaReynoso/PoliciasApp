// src/app/pages/incidencia-detalle/incidencia-detalle.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia.service';

@Component({
  selector: 'app-incidencia-detalle',
  templateUrl: './incidencia-detalle.page.html',
  styleUrls: ['./incidencia-detalle.page.scss'],
})
export class IncidenciaDetallePage implements OnInit {
  incidencia: any;

  constructor(private route: ActivatedRoute, private incidenciaService: IncidenciaService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || "0";
    this.incidenciaService.getAllIncidents().then((data) => {
      this.incidencia = data.find(incident => incident.id === parseInt(id));
    });
  }
}
