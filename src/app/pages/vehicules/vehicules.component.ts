import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService } from '../../shared/services/vehicule.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

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

@Component({
  selector: 'app-vehicules',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent, BadgeComponent],
  templateUrl: './vehicules.component.html',
  styles: ``
})
export class VehiculesComponent implements OnInit {

  vehicules: Vehicule[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedVehicule: Vehicule | null = null;

  formData: Vehicule = {
    immatriculation: '',
    kilometrage_actuel: 0,
    carburant: 'DIE',
    modele_id: 1,
    estDisponibilite: true
  };

  errors: { [key: string]: string } = {};

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.vehicules = this.vehiculeService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.vehicules;
    return this.vehicules.filter(v =>
      v.immatriculation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(vehicule: Vehicule) {
    this.isEditMode = true;
    this.selectedVehicule = vehicule;
    this.formData = { ...vehicule };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.immatriculation.trim()) this.errors['immatriculation'] = 'Immatriculation requise';
    if (this.formData.kilometrage_actuel < 0) this.errors['kilometrage_actuel'] = 'Kilométrage invalide';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedVehicule?.id) {
      this.vehiculeService.update(this.selectedVehicule.id, this.formData);
      this.vehicules = this.vehicules.map(v =>
        v.id === this.selectedVehicule?.id ? { ...this.formData, id: v.id } : v
      );
      alert('Véhicule modifié avec succès!');
    } else {
      this.vehiculeService.create(this.formData);
      this.vehicules.push({ ...this.formData, id: Math.max(...this.vehicules.map(v => v.id || 0), 0) + 1 });
      alert('Véhicule créé avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(vehicule: Vehicule) {
    this.selectedVehicule = vehicule;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedVehicule?.id) {
      this.vehiculeService.delete(this.selectedVehicule.id);
      this.vehicules = this.vehicules.filter(v => v.id !== this.selectedVehicule?.id);
      alert('Véhicule supprimé avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedVehicule = null;
  }

  private resetForm() {
    this.formData = {
      immatriculation: '',
      kilometrage_actuel: 0,
      carburant: 'DIE',
      modele_id: 1,
      estDisponibilite: true
    };
    this.errors = {};
  }

  getCarburantBadgeColor(carburant: string): 'success' | 'info' | 'warning' | 'error' {
    const colors: { [key: string]: 'success' | 'info' | 'warning' | 'error' } = {
      'ESS': 'info',
      'DIE': 'warning',
      'HYB': 'success'
    };
    return colors[carburant] || 'info';
  }

  getDisponibilityBadgeColor(disponible: boolean): 'success' | 'error' {
    return disponible ? 'success' : 'error';
  }
}
