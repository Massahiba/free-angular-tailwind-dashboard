import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../shared/services/utilisateur.service';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: string;
  statut: 'actif' | 'inactif';
}

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageBreadcrumbComponent,
    ComponentCardComponent,
    BadgeComponent
  ],
  templateUrl: './utilisateurs.component.html',
  styles: ``
})
export class UtilisateursComponent implements OnInit {

  // 📊 DONNÉES
  utilisateurs: Utilisateur[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  
  // Modal et Formulaire
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  isEditMode: boolean = false;
  selectedUtilisateur: Utilisateur | null = null;
  
  // Formulaire
  formData: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'user',
    statut: 'actif'
  };
  
  // Erreurs
  errors: { [key: string]: string } = {};

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.loadUtilisateurs();
  }

  // 📥 CHARGER LES UTILISATEURS
  loadUtilisateurs() {
    this.isLoading = true;
    // Données de démonstration (à remplacer par l'API)
    this.utilisateurs = this.utilisateurService.getUtilisateurs();
    this.isLoading = false;
  }

  // 🔍 FILTRER LES UTILISATEURS
  get filteredUtilisateurs(): Utilisateur[] {
    if (!this.searchTerm) {
      return this.utilisateurs;
    }
    return this.utilisateurs.filter(u =>
      u.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // ➕ OUVRIR MODAL CRÉATION
  openCreateModal() {
    this.isEditMode = false;
    this.selectedUtilisateur = null;
    this.resetForm();
    this.showModal = true;
  }

  // ✏️ OUVRIR MODAL ÉDITION
  openEditModal(utilisateur: Utilisateur) {
    this.isEditMode = true;
    this.selectedUtilisateur = utilisateur;
    this.formData = { ...utilisateur };
    this.showModal = true;
  }

  // 📝 VALIDER LE FORMULAIRE
  validateForm(): boolean {
    this.errors = {};
    
    if (!this.formData.nom.trim()) {
      this.errors['nom'] = 'Le nom est requis';
    }
    if (!this.formData.prenom.trim()) {
      this.errors['prenom'] = 'Le prénom est requis';
    }
    if (!this.formData.email.trim()) {
      this.errors['email'] = 'L\'email est requis';
    } else if (!this.isValidEmail(this.formData.email)) {
      this.errors['email'] = 'Email invalide';
    }
    
    return Object.keys(this.errors).length === 0;
  }

  // ✉️ VÉRIFIER EMAIL
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 💾 SAUVEGARDER (CRÉER OU ÉDITER)
  saveUtilisateur() {
    if (!this.validateForm()) {
      return;
    }

    if (this.isEditMode && this.selectedUtilisateur?.id) {
      // ÉDITER
      this.utilisateurService.updateUtilisateur(this.selectedUtilisateur.id, this.formData);
      this.utilisateurs = this.utilisateurs.map(u =>
        u.id === this.selectedUtilisateur?.id ? { ...this.formData, id: u.id } : u
      );
      alert('Utilisateur modifié avec succès!');
    } else {
      // CRÉER
      const newId = Math.max(...this.utilisateurs.map(u => u.id || 0), 0) + 1;
      const newUser: Utilisateur = { ...this.formData, id: newId };
      this.utilisateurService.createUtilisateur(newUser);
      this.utilisateurs.push(newUser);
      alert('Utilisateur créé avec succès!');
    }

    this.closeModal();
  }

  // 🗑️ OUVRIR CONFIRMATION SUPPRESSION
  openDeleteModal(utilisateur: Utilisateur) {
    this.selectedUtilisateur = utilisateur;
    this.showDeleteModal = true;
  }

  // ❌ SUPPRIMER UTILISATEUR
  deleteUtilisateur() {
    if (this.selectedUtilisateur?.id) {
      this.utilisateurService.deleteUtilisateur(this.selectedUtilisateur.id);
      this.utilisateurs = this.utilisateurs.filter(u => u.id !== this.selectedUtilisateur?.id);
      alert('Utilisateur supprimé avec succès!');
      this.closeDeleteModal();
    }
  }

  // ❌ FERMER MODAL
  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  // ❌ FERMER MODAL SUPPRESSION
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedUtilisateur = null;
  }

  // 🔄 RÉINITIALISER LE FORMULAIRE
  private resetForm() {
    this.formData = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      role: 'user',
      statut: 'actif'
    };
    this.errors = {};
  }

  // 🎨 CSS DYNAMIQUE POUR LE RÔLE (Badge component)
  getRoleBadgeColor(role: string): 'success' | 'warning' | 'error' | 'info' {
    switch(role) {
      case 'admin':
        return 'error';
      case 'moderator':
        return 'warning';
      case 'user':
        return 'info';
      default:
        return 'info';
    }
  }

  // 🎨 CSS DYNAMIQUE POUR LE STATUT (Badge component)
  getStatutBadgeColor(statut: string): 'success' | 'warning' | 'error' | 'info' {
    return statut === 'actif' ? 'success' : 'error';
  }
}
