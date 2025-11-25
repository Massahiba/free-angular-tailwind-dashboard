import { Injectable } from '@angular/core';

interface Vidange {
  id?: number;
  vehicule_id: number;
  conducteur_id: number;
  date_vidange: string;
  kilometrage_vidange: number;
  kilometrage_a_effectuer: number;
  type_huile: string;
}

@Injectable({
  providedIn: 'root'
})
export class VidangeService {

  private vidanges: Vidange[] = [
    {
      id: 1,
      vehicule_id: 1,
      conducteur_id: 1,
      date_vidange: '2025-01-15',
      kilometrage_vidange: 15000,
      kilometrage_a_effectuer: 5000,
      type_huile: 'Castrol 10W-40'
    }
  ];

  getAll(): Vidange[] {
    return this.vidanges;
  }

  getById(id: number): Vidange | undefined {
    return this.vidanges.find(v => v.id === id);
  }

  create(vidange: Vidange): Vidange {
    const newId = Math.max(...this.vidanges.map(v => v.id || 0), 0) + 1;
    const newVidange: Vidange = { ...vidange, id: newId };
    this.vidanges.push(newVidange);
    return newVidange;
  }

  update(id: number, vidange: Vidange): Vidange | undefined {
    const index = this.vidanges.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vidanges[index] = { ...vidange, id };
      return this.vidanges[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.vidanges.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vidanges.splice(index, 1);
      return true;
    }
    return false;
  }
}
