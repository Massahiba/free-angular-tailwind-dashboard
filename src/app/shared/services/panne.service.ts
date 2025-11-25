import { Injectable } from '@angular/core';

interface Panne {
  id?: number;
  vehicule_id: number;
  conducteur_id: number;
  type_panne: string;
  gravite: 'MINEURE' | 'MOYENNE' | 'GRAVE' | 'CRITIQUE';
  description: string;
  date_panne: string;
  lieu_panne: string;
  statut: 'SIGNALEE' | 'EN_COURS' | 'REPAREE' | 'EN_ATTENTE_PIECE' | 'NON_REPARABLE';
  garage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PanneService {

  private pannes: Panne[] = [
    {
      id: 1,
      vehicule_id: 1,
      conducteur_id: 1,
      type_panne: 'MOTEUR',
      gravite: 'MOYENNE',
      description: 'Surchauffe du moteur',
      date_panne: '2025-01-18',
      lieu_panne: 'Ouagadougou',
      statut: 'EN_COURS',
      garage: 'Garage Auto Burkina'
    }
  ];

  getAll(): Panne[] {
    return this.pannes;
  }

  getById(id: number): Panne | undefined {
    return this.pannes.find(p => p.id === id);
  }

  create(panne: Panne): Panne {
    const newId = Math.max(...this.pannes.map(p => p.id || 0), 0) + 1;
    const newPanne: Panne = { ...panne, id: newId };
    this.pannes.push(newPanne);
    return newPanne;
  }

  update(id: number, panne: Panne): Panne | undefined {
    const index = this.pannes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pannes[index] = { ...panne, id };
      return this.pannes[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.pannes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pannes.splice(index, 1);
      return true;
    }
    return false;
  }
}
