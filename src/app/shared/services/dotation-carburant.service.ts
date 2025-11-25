import { Injectable } from '@angular/core';

interface DotationCarburant {
  id?: number;
  mission_id?: number;
  vehicule_id: number;
  montant: number;
  type_dotation: 'MISSION' | 'VILLE';
}

@Injectable({
  providedIn: 'root'
})
export class DotationCarburantService {

  private dotations: DotationCarburant[] = [
    {
      id: 1,
      mission_id: 1,
      vehicule_id: 1,
      montant: 50000,
      type_dotation: 'MISSION'
    }
  ];

  getAll(): DotationCarburant[] {
    return this.dotations;
  }

  getById(id: number): DotationCarburant | undefined {
    return this.dotations.find(d => d.id === id);
  }

  create(dotation: DotationCarburant): DotationCarburant {
    const newId = Math.max(...this.dotations.map(d => d.id || 0), 0) + 1;
    const newDotation: DotationCarburant = { ...dotation, id: newId };
    this.dotations.push(newDotation);
    return newDotation;
  }

  update(id: number, dotation: DotationCarburant): DotationCarburant | undefined {
    const index = this.dotations.findIndex(d => d.id === id);
    if (index !== -1) {
      this.dotations[index] = { ...dotation, id };
      return this.dotations[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.dotations.findIndex(d => d.id === id);
    if (index !== -1) {
      this.dotations.splice(index, 1);
      return true;
    }
    return false;
  }
}
