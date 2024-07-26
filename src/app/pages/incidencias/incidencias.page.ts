import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../../services/incidencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {
  incidencia: any = {};
  incidents: any = [];

  constructor(private incidenciaService: IncidenciaService, private router: Router) {
  }

  ngOnInit() {
    this.getAllIncidents();
  }

  async onSubmit() {
    await this.incidenciaService.addItem(this.incidencia.titulo, this.incidencia.fecha, this.incidencia.descripcion, this.incidencia.foto, this.incidencia.audio);
    this.incidencia = {};
    this.getAllIncidents();
  }

  async getAllIncidents() {
    this.incidents = await this.incidenciaService.getAllIncidents();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.incidencia.foto = reader.result as string;
      };
    }
  }

  onAudioChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.incidencia.audio = reader.result as string;
      };
    }
  }

  openDetail(id: number) {
    this.router.navigate(['/incidencia-detalle', id]);
  }
}
