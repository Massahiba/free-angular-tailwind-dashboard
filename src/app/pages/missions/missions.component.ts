import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MissionService } from '../../shared/services/mission.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';

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

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent],
  templateUrl: './missions.component.html',
  styles: ``
})
export class MissionsComponent implements OnInit {

  missions: Mission[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedMission: Mission | null = null;

  formData: Mission = {
    date_debut: '',
    date_fin: '',
    chef_mission: '',
    lieu: '',
    direction_id: 1,
    conducteur_id: 1,
    vehicule_id: 1
  };

  errors: { [key: string]: string } = {};

  constructor(private missionService: MissionService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.missions = this.missionService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.missions;
    return this.missions.filter(m =>
      m.lieu.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.chef_mission.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(mission: Mission) {
    this.isEditMode = true;
    this.selectedMission = mission;
    this.formData = { ...mission };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.date_debut) this.errors['date_debut'] = 'Date de début requise';
    if (!this.formData.date_fin) this.errors['date_fin'] = 'Date de fin requise';
    if (!this.formData.chef_mission.trim()) this.errors['chef_mission'] = 'Chef de mission requis';
    if (!this.formData.lieu.trim()) this.errors['lieu'] = 'Lieu requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedMission?.id) {
      this.missionService.update(this.selectedMission.id, this.formData);
      this.missions = this.missions.map(m =>
        m.id === this.selectedMission?.id ? { ...this.formData, id: m.id } : m
      );
      alert('Mission modifiée avec succès!');
    } else {
      this.missionService.create(this.formData);
      this.missions.push({ ...this.formData, id: Math.max(...this.missions.map(m => m.id || 0), 0) + 1 });
      alert('Mission créée avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(mission: Mission) {
    this.selectedMission = mission;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedMission?.id) {
      this.missionService.delete(this.selectedMission.id);
      this.missions = this.missions.filter(m => m.id !== this.selectedMission?.id);
      alert('Mission supprimée avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMission = null;
  }

  private resetForm() {
    this.formData = {
      date_debut: '',
      date_fin: '',
      chef_mission: '',
      lieu: '',
      direction_id: 1,
      conducteur_id: 1,
      vehicule_id: 1
    };
    this.errors = {};
  }
}
