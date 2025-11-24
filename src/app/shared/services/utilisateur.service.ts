import { Injectable } from '@angular/core';

interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: string;
  statut: 'actif' | 'inactif';
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  // 📊 Données de démonstration (à remplacer par des appels API)
  private utilisateurs: Utilisateur[] = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 6 12 34 56 78',
      role: 'admin',
      statut: 'actif'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie.martin@example.com',
      telephone: '+33 6 98 76 54 32',
      role: 'moderator',
      statut: 'actif'
    },
    {
      id: 3,
      nom: 'Durand',
      prenom: 'Pierre',
      email: 'pierre.durand@example.com',
      telephone: '+33 6 11 22 33 44',
      role: 'user',
      statut: 'actif'
    },
    {
      id: 4,
      nom: 'Lefevre',
      prenom: 'Sophie',
      email: 'sophie.lefevre@example.com',
      telephone: '+33 6 55 66 77 88',
      role: 'user',
      statut: 'inactif'
    },
    {
      id: 5,
      nom: 'Moreau',
      prenom: 'Luc',
      email: 'luc.moreau@example.com',
      telephone: '+33 6 99 88 77 66',
      role: 'user',
      statut: 'actif'
    }
  ];

  constructor() {}

  // 📥 RÉCUPÉRER TOUS LES UTILISATEURS
  getUtilisateurs(): Utilisateur[] {
    return this.utilisateurs;
  }

  // 🔍 RÉCUPÉRER UN UTILISATEUR PAR ID
  getUtilisateur(id: number): Utilisateur | undefined {
    return this.utilisateurs.find(u => u.id === id);
  }

  // ➕ CRÉER UN UTILISATEUR
  createUtilisateur(utilisateur: Utilisateur): Utilisateur {
    const newUser: Utilisateur = {
      ...utilisateur,
      id: Math.max(...this.utilisateurs.map(u => u.id || 0), 0) + 1
    };
    this.utilisateurs.push(newUser);
    
    // 📡 À remplacer par : return this.http.post('/api/utilisateurs', utilisateur)
    console.log('Utilisateur créé:', newUser);
    
    return newUser;
  }

  // ✏️ MODIFIER UN UTILISATEUR
  updateUtilisateur(id: number, utilisateur: Utilisateur): Utilisateur | undefined {
    const index = this.utilisateurs.findIndex(u => u.id === id);
    if (index !== -1) {
      this.utilisateurs[index] = { ...utilisateur, id };
      
      // 📡 À remplacer par : return this.http.put(`/api/utilisateurs/${id}`, utilisateur)
      console.log('Utilisateur modifié:', this.utilisateurs[index]);
      
      return this.utilisateurs[index];
    }
    return undefined;
  }

  // 🗑️ SUPPRIMER UN UTILISATEUR
  deleteUtilisateur(id: number): boolean {
    const index = this.utilisateurs.findIndex(u => u.id === id);
    if (index !== -1) {
      this.utilisateurs.splice(index, 1);
      
      // 📡 À remplacer par : return this.http.delete(`/api/utilisateurs/${id}`)
      console.log('Utilisateur supprimé avec ID:', id);
      
      return true;
    }
    return false;
  }

  // 🔍 FILTRER LES UTILISATEURS PAR RÔLE
  getUtilisateursByRole(role: string): Utilisateur[] {
    return this.utilisateurs.filter(u => u.role === role);
  }

  // 🔍 FILTRER LES UTILISATEURS PAR STATUT
  getUtilisateursByStatut(statut: string): Utilisateur[] {
    return this.utilisateurs.filter(u => u.statut === statut);
  }

  // 📊 OBTENIR LES STATISTIQUES
  getStatistiques() {
    return {
      total: this.utilisateurs.length,
      actifs: this.utilisateurs.filter(u => u.statut === 'actif').length,
      inactifs: this.utilisateurs.filter(u => u.statut === 'inactif').length,
      admins: this.utilisateurs.filter(u => u.role === 'admin').length,
      moderators: this.utilisateurs.filter(u => u.role === 'moderator').length,
      users: this.utilisateurs.filter(u => u.role === 'user').length
    };
  }
}
