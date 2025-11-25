import { Injectable } from '@angular/core';

interface Conducteur {
  id?: number;
  nom: string;
  prenom: string;
  telephone?: string;
  email?: string;
  nationalite: string;
  date_embauche?: string;
  statut: 'actif' | 'inactif';
  disponible: boolean;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  private conducteurs: Conducteur[] = [
    {
      id: 1,
      nom: 'Diallo',
      prenom: 'Ahmed',
      telephone: '+226 70 12 34 56',
      email: 'ahmed.diallo@example.com',
      nationalite: 'Burkinabé',
      date_embauche: '2022-01-15',
      statut: 'actif',
      disponible: true,
      notes: 'Conducteur expérimenté'
    },
    {
      id: 2,
      nom: 'Traore',
      prenom: 'Marie',
      telephone: '+226 70 98 76 54',
      email: 'marie.traore@example.com',
      nationalite: 'Burkinabé',
      date_embauche: '2023-03-20',
      statut: 'actif',
      disponible: false,
      notes: 'En mission'
    }
  ];

  getAll(): Conducteur[] {
    return this.conducteurs;
  }

  getById(id: number): Conducteur | undefined {
    return this.conducteurs.find(c => c.id === id);
  }

  create(conducteur: Conducteur): Conducteur {
    const newId = Math.max(...this.conducteurs.map(c => c.id || 0), 0) + 1;
    const newConducteur: Conducteur = { ...conducteur, id: newId };
    this.conducteurs.push(newConducteur);
    return newConducteur;
  }

  update(id: number, conducteur: Conducteur): Conducteur | undefined {
    const index = this.conducteurs.findIndex(c => c.id === id);
    if (index !== -1) {
      this.conducteurs[index] = { ...conducteur, id };
      return this.conducteurs[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.conducteurs.findIndex(c => c.id === id);
    if (index !== -1) {
      this.conducteurs.splice(index, 1);
      return true;
    }
    return false;
  }
}
