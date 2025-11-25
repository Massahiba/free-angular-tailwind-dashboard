import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanneService } from '../../shared/services/panne.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

interface Panne {
  id?: number;
  vehicule_id: number;
  conducteur_id: number;
  type_panne: string;
  gravite: 'MINEURE' | 'MOYENNE' | 'GRAVE' | 'CRITIQUE';
  description: string;
  date_panne: string;
  lieu_panne: string;
  statut: 'SIGNALEE' | 'EN_COURS' | 'REPAREE' | 'EN_ATTENTE_PIECE' | 'NON_REPARABLE';
  garage?: string;
}

@Component({
  selector: 'app-pannes',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent, BadgeComponent],
  templateUrl: './pannes.component.html',
  styles: ``
})
export class PannesComponent implements OnInit {

  pannes: Panne[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedPanne: Panne | null = null;

  formData: Panne = {
    vehicule_id: 1,
    conducteur_id: 1,
    type_panne: '',
    gravite: 'MOYENNE',
    description: '',
    date_panne: '',
    lieu_panne: '',
    statut: 'SIGNALEE',
    garage: ''
  };

  errors: { [key: string]: string } = {};

  constructor(private panneService: PanneService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.pannes = this.panneService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.pannes;
    return this.pannes.filter(p =>
      p.type_panne.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.lieu_panne.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(panne: Panne) {
    this.isEditMode = true;
    this.selectedPanne = panne;
    this.formData = { ...panne };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.type_panne.trim()) this.errors['type_panne'] = 'Type de panne requis';
    if (!this.formData.date_panne) this.errors['date_panne'] = 'Date requise';
    if (!this.formData.description.trim()) this.errors['description'] = 'Description requise';
    if (!this.formData.lieu_panne.trim()) this.errors['lieu_panne'] = 'Lieu requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedPanne?.id) {
      this.panneService.update(this.selectedPanne.id, this.formData);
      this.pannes = this.pannes.map(p =>
        p.id === this.selectedPanne?.id ? { ...this.formData, id: p.id } : p
      );
      alert('Panne modifiée avec succès!');
    } else {
      this.panneService.create(this.formData);
      this.pannes.push({ ...this.formData, id: Math.max(...this.pannes.map(p => p.id || 0), 0) + 1 });
      alert('Panne créée avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(panne: Panne) {
    this.selectedPanne = panne;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedPanne?.id) {
      this.panneService.delete(this.selectedPanne.id);
      this.pannes = this.pannes.filter(p => p.id !== this.selectedPanne?.id);
      alert('Panne supprimée avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedPanne = null;
  }

  private resetForm() {
    this.formData = {
      vehicule_id: 1,
      conducteur_id: 1,
      type_panne: '',
      gravite: 'MOYENNE',
      description: '',
      date_panne: '',
      lieu_panne: '',
      statut: 'SIGNALEE',
      garage: ''
    };
    this.errors = {};
  }

  getGraviteBadgeColor(gravite: string): 'success' | 'info' | 'warning' | 'error' {
    switch (gravite) {
      case 'MINEURE': return 'info';
      case 'MOYENNE': return 'warning';
      case 'GRAVE': return 'error';
      case 'CRITIQUE': return 'error';
      default: return 'info';
    }
  }

  getStatutBadgeColor(statut: string): 'success' | 'info' | 'warning' | 'error' {
    switch (statut) {
      case 'REPAREE': return 'success';
      case 'EN_COURS': return 'info';
      case 'EN_ATTENTE_PIECE': return 'warning';
      case 'SIGNALEE': return 'warning';
      case 'NON_REPARABLE': return 'error';
      default: return 'info';
    }
  }
}
