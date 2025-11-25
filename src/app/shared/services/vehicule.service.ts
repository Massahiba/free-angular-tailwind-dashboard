import { Injectable } from '@angular/core';

interface Vehicule {
  id?: number;
  immatriculation: string;
  kilometrage_actuel: number;
  mise_en_circulation?: string;
  carburant: 'ESS' | 'DIE' | 'HYB';
  modele_id: number;
  estDisponibilite: boolean;
  date_visite?: string;
  date_vidange?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private vehicules: Vehicule[] = [
    {
      id: 1,
      immatriculation: 'BF-2023-A-001',
      kilometrage_actuel: 15000,
      mise_en_circulation: '2023-01-15',
      carburant: 'DIE',
      modele_id: 1,
      estDisponibilite: true,
      date_visite: '2025-01-20',
      date_vidange: '2025-02-15'
    },
    {
      id: 2,
      immatriculation: 'BF-2023-A-002',
      kilometrage_actuel: 28500,
      mise_en_circulation: '2023-03-10',
      carburant: 'ESS',
      modele_id: 2,
      estDisponibilite: false,
      date_visite: '2025-01-25',
      date_vidange: '2025-02-20'
    }
  ];

  getAll(): Vehicule[] {
    return this.vehicules;
  }

  getById(id: number): Vehicule | undefined {
    return this.vehicules.find(v => v.id === id);
  }

  create(vehicule: Vehicule): Vehicule {
    const newId = Math.max(...this.vehicules.map(v => v.id || 0), 0) + 1;
    const newVehicule: Vehicule = { ...vehicule, id: newId };
    this.vehicules.push(newVehicule);
    return newVehicule;
  }

  update(id: number, vehicule: Vehicule): Vehicule | undefined {
    const index = this.vehicules.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vehicules[index] = { ...vehicule, id };
      return this.vehicules[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.vehicules.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vehicules.splice(index, 1);
      return true;
    }
    return false;
  }
}
