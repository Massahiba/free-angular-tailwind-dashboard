import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConducteurService } from '../../shared/services/conducteur.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

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

@Component({
  selector: 'app-conducteurs',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent, BadgeComponent],
  templateUrl: './conducteurs.component.html',
  styles: ``
})
export class ConducteursComponent implements OnInit {

  conducteurs: Conducteur[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedConducteur: Conducteur | null = null;

  formData: Conducteur = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    nationalite: 'Burkinabé',
    statut: 'actif',
    disponible: true
  };

  errors: { [key: string]: string } = {};

  constructor(private conducteurService: ConducteurService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.conducteurs = this.conducteurService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.conducteurs;
    return this.conducteurs.filter(c =>
      c.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(conducteur: Conducteur) {
    this.isEditMode = true;
    this.selectedConducteur = conducteur;
    this.formData = { ...conducteur };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.nom.trim()) this.errors['nom'] = 'Nom requis';
    if (!this.formData.prenom.trim()) this.errors['prenom'] = 'Prénom requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedConducteur?.id) {
      this.conducteurService.update(this.selectedConducteur.id, this.formData);
      this.conducteurs = this.conducteurs.map(c =>
        c.id === this.selectedConducteur?.id ? { ...this.formData, id: c.id } : c
      );
      alert('Conducteur modifié avec succès!');
    } else {
      this.conducteurService.create(this.formData);
      this.conducteurs.push({ ...this.formData, id: Math.max(...this.conducteurs.map(c => c.id || 0), 0) + 1 });
      alert('Conducteur créé avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(conducteur: Conducteur) {
    this.selectedConducteur = conducteur;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedConducteur?.id) {
      this.conducteurService.delete(this.selectedConducteur.id);
      this.conducteurs = this.conducteurs.filter(c => c.id !== this.selectedConducteur?.id);
      alert('Conducteur supprimé avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedConducteur = null;
  }

  private resetForm() {
    this.formData = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      nationalite: 'Burkinabé',
      statut: 'actif',
      disponible: true
    };
    this.errors = {};
  }

  getStatutBadgeColor(statut: string): 'success' | 'error' {
    return statut === 'actif' ? 'success' : 'error';
  }

  getDisponibilityBadgeColor(disponible: boolean): 'success' | 'warning' {
    return disponible ? 'success' : 'warning';
  }
}
