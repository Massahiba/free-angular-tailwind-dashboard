import { Injectable } from '@angular/core';

interface Modele {
  id?: number;
  designation: string;
  marque: 'TOYOTA' | 'MERCEDES' | 'HYUNDAI' | 'PEUGEOT' | 'RENAULT' | 'VOLVO' | 'OTHER';
  pays_origine: string;
  type_vehicule: 'BERLINE' | 'SUV' | 'PICKUP' | 'UTILITAIRE' | 'BUS' | 'MINIBUS';
}

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  private modeles: Modele[] = [
    {
      id: 1,
      designation: 'Toyota Corolla',
      marque: 'TOYOTA',
      pays_origine: 'Japon',
      type_vehicule: 'BERLINE'
    },
    {
      id: 2,
      designation: 'Mercedes-Benz Sprinter',
      marque: 'MERCEDES',
      pays_origine: 'Allemagne',
      type_vehicule: 'UTILITAIRE'
    }
  ];

  getAll(): Modele[] {
    return this.modeles;
  }

  getById(id: number): Modele | undefined {
    return this.modeles.find(m => m.id === id);
  }

  create(modele: Modele): Modele {
    const newId = Math.max(...this.modeles.map(m => m.id || 0), 0) + 1;
    const newModele: Modele = { ...modele, id: newId };
    this.modeles.push(newModele);
    return newModele;
  }

  update(id: number, modele: Modele): Modele | undefined {
    const index = this.modeles.findIndex(m => m.id === id);
    if (index !== -1) {
      this.modeles[index] = { ...modele, id };
      return this.modeles[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.modeles.findIndex(m => m.id === id);
    if (index !== -1) {
      this.modeles.splice(index, 1);
      return true;
    }
    return false;
  }
}
