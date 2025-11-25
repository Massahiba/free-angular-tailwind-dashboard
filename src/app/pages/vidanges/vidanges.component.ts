import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VidangeService } from '../../shared/services/vidange.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';

interface Vidange {
  id?: number;
  vehicule_id: number;
  conducteur_id: number;
  date_vidange: string;
  kilometrage_vidange: number;
  kilometrage_a_effectuer: number;
  type_huile: string;
}

@Component({
  selector: 'app-vidanges',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, ComponentCardComponent],
  templateUrl: './vidanges.component.html',
  styles: ``
})
export class VidangesComponent implements OnInit {

  vidanges: Vidange[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedVidange: Vidange | null = null;

  formData: Vidange = {
    vehicule_id: 1,
    conducteur_id: 1,
    date_vidange: '',
    kilometrage_vidange: 0,
    kilometrage_a_effectuer: 5000,
    type_huile: ''
  };

  errors: { [key: string]: string } = {};

  constructor(private vidangeService: VidangeService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.vidanges = this.vidangeService.getAll();
    this.isLoading = false;
  }

  get filtered() {
    if (!this.searchTerm) return this.vidanges;
    return this.vidanges.filter(v =>
      v.type_huile.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(vidange: Vidange) {
    this.isEditMode = true;
    this.selectedVidange = vidange;
    this.formData = { ...vidange };
    this.showModal = true;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.formData.date_vidange) this.errors['date_vidange'] = 'Date requise';
    if (this.formData.kilometrage_vidange < 0) this.errors['kilometrage_vidange'] = 'Kilométrage invalide';
    if (!this.formData.type_huile.trim()) this.errors['type_huile'] = 'Type d\'huile requis';
    return Object.keys(this.errors).length === 0;
  }

  saveData() {
    if (!this.validateForm()) return;

    if (this.isEditMode && this.selectedVidange?.id) {
      this.vidangeService.update(this.selectedVidange.id, this.formData);
      this.vidanges = this.vidanges.map(v =>
        v.id === this.selectedVidange?.id ? { ...this.formData, id: v.id } : v
      );
      alert('Vidange modifiée avec succès!');
    } else {
      this.vidangeService.create(this.formData);
      this.vidanges.push({ ...this.formData, id: Math.max(...this.vidanges.map(v => v.id || 0), 0) + 1 });
      alert('Vidange créée avec succès!');
    }
    this.closeModal();
  }

  openDeleteModal(vidange: Vidange) {
    this.selectedVidange = vidange;
    this.showDeleteModal = true;
  }

  deleteData() {
    if (this.selectedVidange?.id) {
      this.vidangeService.delete(this.selectedVidange.id);
      this.vidanges = this.vidanges.filter(v => v.id !== this.selectedVidange?.id);
      alert('Vidange supprimée avec succès!');
      this.closeDeleteModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedVidange = null;
  }

  private resetForm() {
    this.formData = {
      vehicule_id: 1,
      conducteur_id: 1,
      date_vidange: '',
      kilometrage_vidange: 0,
      kilometrage_a_effectuer: 5000,
      type_huile: ''
    };
    this.errors = {};
  }
}
