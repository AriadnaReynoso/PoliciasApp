import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private db: SQLiteDBConnection | any = null;
  private storage: Storage | null = null;
  readonly db_name: string = "incidencias_db";
  readonly db_table: string = "incidencias";
  INCIDENTS: Array<any> = [];

  constructor(private platform: Platform, private storageService: Storage) {
    this.initialize();
  }

  async initialize() {
    await this.platform.ready();
    if (Capacitor.getPlatform() === 'web') {
      this.storage = await this.storageService.create();
    } else {
      await this.databaseConn();
    }
  }

  async databaseConn() {
    try {
      const dbOptions = { 
        database: this.db_name, 
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      };
      this.db = await CapacitorSQLite.createConnection(dbOptions);
      if (this.db) {
        await this.db.open();
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS ${this.db_table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            fecha TEXT,
            descripcion TEXT,
            foto TEXT,
            audio TEXT
          )`);
        console.log('Table Created!');
      }
    } catch (error) {
      console.error('Unable to open database', error);
    }
  }

  async addItem(titulo: string, fecha: string, descripcion: string, foto: string, audio: string) {
    if (this.storage) {
      const id = new Date().getTime();
      const newItem = { id, titulo, fecha, descripcion, foto, audio };
      await this.storage.set(`${id}`, newItem);
      this.INCIDENTS.push(newItem);
    } else if (this.db) {
      try {
        const sql = `INSERT INTO ${this.db_table} (titulo, fecha, descripcion, foto, audio) VALUES (?, ?, ?, ?, ?)`;
        const values = [titulo, fecha, descripcion, foto, audio];
        await this.db.run(sql, values);
        await this.getAllIncidents();
      } catch (error) {
        console.error('Unable to add item', error);
      }
    }
  }

  async getAllIncidents() {
    if (this.storage) {
      this.INCIDENTS = [];
      await this.storage.forEach((value, key, index) => {
        this.INCIDENTS.push(value);
      });
      return this.INCIDENTS;
    } else if (this.db) {
      try {
        const sql = `SELECT * FROM ${this.db_table}`;
        const res = await this.db.query(sql);
        this.INCIDENTS = res?.values || [];
        return this.INCIDENTS;
      } catch (error) {
        return [];
      }
    }

    return [];
  }

  async deleteAllIncidents() {
    if (this.storage) {
      await this.storage.clear();
      this.INCIDENTS = [];
    } else if (this.db) {
      try {
        const sql = `DELETE FROM ${this.db_table}`;
        await this.db.run(sql);
        this.INCIDENTS = [];
      } catch (error) {
        console.error('Unable to delete incidents', error);
      }
    }
  }
}
