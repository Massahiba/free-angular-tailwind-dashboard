import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectionService } from '../../shared/services/direction.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';

interface Direction {
  id?: number;
  libelle: string;
}

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent],
  templateUrl: './directions.component.html',
  styles: ``
})
export class DirectionsComponent implements OnInit {

  directions: Direction[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedDirection: Direction | null = null;

  formData: Direction = {
    libelle: ''
  };

  errors: { [key: string]: string } = {};

  constructor(private directionService: DirectionService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.directions = this.directionService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.directions;
    return this.directions.filter(d =>
      d.libelle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(direction: Direction) {
    this.isEditMode = true;
    this.selectedDirection = direction;
    this.formData = { ...direction };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.libelle.trim()) this.errors['libelle'] = 'Libellé requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedDirection?.id) {
      this.directionService.update(this.selectedDirection.id, this.formData);
      this.directions = this.directions.map(d =>
        d.id === this.selectedDirection?.id ? { ...this.formData, id: d.id } : d
      );
      alert('Direction modifiée avec succès!');
    } else {
      this.directionService.create(this.formData);
      this.directions.push({ ...this.formData, id: Math.max(...this.directions.map(d => d.id || 0), 0) + 1 });
      alert('Direction créée avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(direction: Direction) {
    this.selectedDirection = direction;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedDirection?.id) {
      this.directionService.delete(this.selectedDirection.id);
      this.directions = this.directions.filter(d => d.id !== this.selectedDirection?.id);
      alert('Direction supprimée avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDirection = null;
  }

  private resetForm() {
    this.formData = { libelle: '' };
    this.errors = {};
  }
}
