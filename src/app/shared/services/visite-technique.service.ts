import { Injectable } from '@angular/core';

interface VisiteTechnique {
  id?: number;
  vehicule_id: number;
  conducteur_id: number;
  date_visite: string;
  observation: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisiteTechniqueService {

  private visites: VisiteTechnique[] = [
    {
      id: 1,
      vehicule_id: 1,
      conducteur_id: 1,
      date_visite: '2025-01-20',
      observation: 'Visite conforme'
    }
  ];

  getAll(): VisiteTechnique[] {
    return this.visites;
  }

  getById(id: number): VisiteTechnique | undefined {
    return this.visites.find(v => v.id === id);
  }

  create(visite: VisiteTechnique): VisiteTechnique {
    const newId = Math.max(...this.visites.map(v => v.id || 0), 0) + 1;
    const newVisite: VisiteTechnique = { ...visite, id: newId };
    this.visites.push(newVisite);
    return newVisite;
  }

  update(id: number, visite: VisiteTechnique): VisiteTechnique | undefined {
    const index = this.visites.findIndex(v => v.id === id);
    if (index !== -1) {
      this.visites[index] = { ...visite, id };
      return this.visites[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.visites.findIndex(v => v.id === id);
    if (index !== -1) {
      this.visites.splice(index, 1);
      return true;
    }
    return false;
  }
}
