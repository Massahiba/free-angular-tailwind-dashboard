import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisiteTechniqueService } from '../../shared/services/visite-technique.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

interface VisiteTechnique {
  id?: number;
  vehicule_id: number;
  conducteur_id: number;
  date_visite: string;
  observation: string;
  statut?: 'conforme' | 'non_conforme' | 'a_revoir';
}

@Component({
  selector: 'app-visites-techniques',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent, BadgeComponent],
  templateUrl: './visites-techniques.component.html',
  styles: ``
})
export class VisistesTechniquesComponent implements OnInit {

  visites: VisiteTechnique[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedVisite: VisiteTechnique | null = null;

  formData: VisiteTechnique = {
    vehicule_id: 1,
    conducteur_id: 1,
    date_visite: '',
    observation: '',
    statut: 'conforme'
  };

  errors: { [key: string]: string } = {};

  constructor(private visiteService: VisiteTechniqueService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.visites = this.visiteService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.visites;
    return this.visites.filter(v =>
      v.observation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(visite: VisiteTechnique) {
    this.isEditMode = true;
    this.selectedVisite = visite;
    this.formData = { ...visite };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.date_visite) this.errors['date_visite'] = 'Date requise';
    if (!this.formData.observation.trim()) this.errors['observation'] = 'Observation requise';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedVisite?.id) {
      this.visiteService.update(this.selectedVisite.id, this.formData);
      this.visites = this.visites.map(v =>
        v.id === this.selectedVisite?.id ? { ...this.formData, id: v.id } : v
      );
      alert('Visite technique modifiée avec succès!');
    } else {
      this.visiteService.create(this.formData);
      this.visites.push({ ...this.formData, id: Math.max(...this.visites.map(v => v.id || 0), 0) + 1 });
      alert('Visite technique créée avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(visite: VisiteTechnique) {
    this.selectedVisite = visite;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedVisite?.id) {
      this.visiteService.delete(this.selectedVisite.id);
      this.visites = this.visites.filter(v => v.id !== this.selectedVisite?.id);
      alert('Visite technique supprimée avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedVisite = null;
  }

  private resetForm() {
    this.formData = {
      vehicule_id: 1,
      conducteur_id: 1,
      date_visite: '',
      observation: '',
      statut: 'conforme'
    };
    this.errors = {};
  }

  getStatutBadgeColor(statut?: string): 'success' | 'warning' | 'error' {
    switch (statut) {
      case 'conforme': return 'success';
      case 'non_conforme': return 'error';
      case 'a_revoir': return 'warning';
      default: return 'success';
    }
  }
}
