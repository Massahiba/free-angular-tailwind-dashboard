import { Injectable } from '@angular/core';

interface Direction {
  id?: number;
  libelle: string;
}

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  private directions: Direction[] = [
    { id: 1, libelle: 'Direction Administrative' },
    { id: 2, libelle: 'Direction Opérationnelle' },
    { id: 3, libelle: 'Direction Technique' }
  ];

  getAll(): Direction[] {
    return this.directions;
  }

  getById(id: number): Direction | undefined {
    return this.directions.find(d => d.id === id);
  }

  create(direction: Direction): Direction {
    const newId = Math.max(...this.directions.map(d => d.id || 0), 0) + 1;
    const newDirection: Direction = { ...direction, id: newId };
    this.directions.push(newDirection);
    return newDirection;
  }

  update(id: number, direction: Direction): Direction | undefined {
    const index = this.directions.findIndex(d => d.id === id);
    if (index !== -1) {
      this.directions[index] = { ...direction, id };
      return this.directions[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.directions.findIndex(d => d.id === id);
    if (index !== -1) {
      this.directions.splice(index, 1);
      return true;
    }
    return false;
  }
}
