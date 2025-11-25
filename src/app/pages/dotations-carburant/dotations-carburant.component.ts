import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DotationCarburantService } from '../../shared/services/dotation-carburant.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

interface DotationCarburant {
  id?: number;
  mission_id?: number;
  vehicule_id: number;
  montant: number;
  type_dotation: 'MISSION' | 'VILLE';
  date_dotation?: string;
}

@Component({
  selector: 'app-dotations-carburant',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent, BadgeComponent],
  templateUrl: './dotations-carburant.component.html',
  styles: ``
})
export class DotationsCarburantComponent implements OnInit {

  dotations: DotationCarburant[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedDotation: DotationCarburant | null = null;

  formData: DotationCarburant = {
    vehicule_id: 1,
    montant: 0,
    type_dotation: 'MISSION',
    date_dotation: new Date().toISOString().split('T')[0]
  };

  errors: { [key: string]: string } = {};

  constructor(private dotationService: DotationCarburantService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.dotations = this.dotationService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.dotations;
    return this.dotations.filter(d =>
      d.type_dotation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(dotation: DotationCarburant) {
    this.isEditMode = true;
    this.selectedDotation = dotation;
    this.formData = { ...dotation };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (this.formData.montant <= 0) this.errors['montant'] = 'Montant doit être supérieur à 0';
    if (this.formData.vehicule_id <= 0) this.errors['vehicule_id'] = 'Véhicule requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedDotation?.id) {
      this.dotationService.update(this.selectedDotation.id, this.formData);
      this.dotations = this.dotations.map(d =>
        d.id === this.selectedDotation?.id ? { ...this.formData, id: d.id } : d
      );
      alert('Dotation modifiée avec succès!');
    } else {
      this.dotationService.create(this.formData);
      this.dotations.push({ ...this.formData, id: Math.max(...this.dotations.map(d => d.id || 0), 0) + 1 });
      alert('Dotation créée avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(dotation: DotationCarburant) {
    this.selectedDotation = dotation;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedDotation?.id) {
      this.dotationService.delete(this.selectedDotation.id);
      this.dotations = this.dotations.filter(d => d.id !== this.selectedDotation?.id);
      alert('Dotation supprimée avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDotation = null;
  }

  private resetForm() {
    this.formData = {
      vehicule_id: 1,
      montant: 0,
      type_dotation: 'MISSION',
      date_dotation: new Date().toISOString().split('T')[0]
    };
    this.errors = {};
  }

  getTypeBadgeColor(type: string): 'success' | 'info' {
    return type === 'MISSION' ? 'success' : 'info';
  }
}
