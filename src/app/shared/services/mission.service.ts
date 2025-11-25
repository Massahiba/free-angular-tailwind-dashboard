import { Injectable } from '@angular/core';

interface Mission {
  id?: number;
  date_debut: string;
  date_fin: string;
  chef_mission: string;
  lieu: string;
  direction_id: number;
  conducteur_id: number;
  vehicule_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private missions: Mission[] = [
    {
      id: 1,
      date_debut: '2025-01-20',
      date_fin: '2025-01-22',
      chef_mission: 'Monsieur Durand',
      lieu: 'Bobo-Dioulasso',
      direction_id: 1,
      conducteur_id: 1,
      vehicule_id: 1
    }
  ];

  getAll(): Mission[] {
    return this.missions;
  }

  getById(id: number): Mission | undefined {
    return this.missions.find(m => m.id === id);
  }

  create(mission: Mission): Mission {
    const newId = Math.max(...this.missions.map(m => m.id || 0), 0) + 1;
    const newMission: Mission = { ...mission, id: newId };
    this.missions.push(newMission);
    return newMission;
  }

  update(id: number, mission: Mission): Mission | undefined {
    const index = this.missions.findIndex(m => m.id === id);
    if (index !== -1) {
      this.missions[index] = { ...mission, id };
      return this.missions[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.missions.findIndex(m => m.id === id);
    if (index !== -1) {
      this.missions.splice(index, 1);
      return true;
    }
    return false;
  }
}
