import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModeleService } from '../../shared/services/modele.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

interface Modele {
  id?: number;
  designation: string;
  marque: 'TOYOTA' | 'MERCEDES' | 'HYUNDAI' | 'PEUGEOT' | 'RENAULT' | 'VOLVO' | 'OTHER';
  pays_origine: string;
  type_vehicule: 'BERLINE' | 'SUV' | 'PICKUP' | 'UTILITAIRE' | 'BUS' | 'MINIBUS';
}

@Component({
  selector: 'app-modeles',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent, BadgeComponent],
  templateUrl: './modeles.component.html',
  styles: ``
})
export class ModelesComponent implements OnInit {

  modeles: Modele[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedModele: Modele | null = null;

  formData: Modele = {
    designation: '',
    marque: 'TOYOTA',
    pays_origine: '',
    type_vehicule: 'BERLINE'
  };

  errors: { [key: string]: string } = {};

  constructor(private modeleService: ModeleService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.modeles = this.modeleService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.modeles;
    return this.modeles.filter(m =>
      m.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.marque.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.type_vehicule.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(modele: Modele) {
    this.isEditMode = true;
    this.selectedModele = modele;
    this.formData = { ...modele };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.designation.trim()) this.errors['designation'] = 'Désignation requise';
    if (!this.formData.pays_origine.trim()) this.errors['pays_origine'] = 'Pays d\'origine requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedModele?.id) {
      this.modeleService.update(this.selectedModele.id, this.formData);
      this.modeles = this.modeles.map(m =>
        m.id === this.selectedModele?.id ? { ...this.formData, id: m.id } : m
      );
      alert('Modèle modifié avec succès!');
    } else {
      this.modeleService.create(this.formData);
      this.modeles.push({ ...this.formData, id: Math.max(...this.modeles.map(m => m.id || 0), 0) + 1 });
      alert('Modèle créé avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(modele: Modele) {
    this.selectedModele = modele;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedModele?.id) {
      this.modeleService.delete(this.selectedModele.id);
      this.modeles = this.modeles.filter(m => m.id !== this.selectedModele?.id);
      alert('Modèle supprimé avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedModele = null;
  }

  private resetForm() {
    this.formData = {
      designation: '',
      marque: 'TOYOTA',
      pays_origine: '',
      type_vehicule: 'BERLINE'
    };
    this.errors = {};
  }

  getMarqueBadgeColor(marque: string): 'success' | 'info' | 'warning' | 'error' {
    const colors: { [key: string]: 'success' | 'info' | 'warning' | 'error' } = {
      'TOYOTA': 'success',
      'MERCEDES': 'info',
      'VOLVO': 'warning',
      'PEUGEOT': 'info'
    };
    return colors[marque] || 'info';
  }

  getTypeBadgeColor(type: string): 'success' | 'info' | 'warning' | 'error' {
    const colors: { [key: string]: 'success' | 'info' | 'warning' | 'error' } = {
      'BERLINE': 'success',
      'SUV': 'info',
      'PICKUP': 'warning',
      'UTILITAIRE': 'warning',
      'BUS': 'error'
    };
    return colors[type] || 'info';
  }
}
