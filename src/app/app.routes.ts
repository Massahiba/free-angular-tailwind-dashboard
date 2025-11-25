import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { ConducteursComponent } from './pages/conducteurs/conducteurs.component';
import { ModelesComponent } from './pages/modeles/modeles.component';
import { VehiculesComponent } from './pages/vehicules/vehicules.component';
import { DirectionsComponent } from './pages/directions/directions.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { VidangesComponent } from './pages/vidanges/vidanges.component';
import { VisistesTechniquesComponent } from './pages/visites-techniques/visites-techniques.component';
import { PannesComponent } from './pages/pannes/pannes.component';
import { DotationsCarburantComponent } from './pages/dotations-carburant/dotations-carburant.component';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
        component: EcommerceComponent,
        pathMatch: 'full',
        title:
          'Tableau de bord | O\'ParcGest ',
      },
      {
        path:'calendar',
        component:CalenderComponent,
        title:'Angular Calender | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'profile',
        component:ProfileComponent,
        title:'Angular Profile Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'form-elements',
        component:FormElementsComponent,
        title:'Angular Form Elements Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'basic-tables',
        component:BasicTablesComponent,
        title:'Angular Basic Tables Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      // support tickets
      {
        path:'invoice',
        component:InvoicesComponent,
        title:'Angular Invoice Details Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'line-chart',
        component:LineChartComponent,
        title:'Angular Line Chart Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'bar-chart',
        component:BarChartComponent,
        title:'Angular Bar Chart Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'alerts',
        component:AlertsComponent,
        title:'Angular Alerts Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'avatars',
        component:AvatarElementComponent,
        title:'Angular Avatars Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'badge',
        component:BadgesComponent,
        title:'Angular Badges Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'buttons',
        component:ButtonsComponent,
        title:'Angular Buttons Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'images',
        component:ImagesComponent,
        title:'Angular Images Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'videos',
        component:VideosComponent,
        title:'Angular Videos Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      //utilisateurs
      {
        path:'utilisateurs',
        component:UtilisateursComponent,
        title:'Utilisateurs | O\'ParcGest - Gestion des utilisateurs'
      },
      //conducteurs
      {
        path:'conducteurs',
        component:ConducteursComponent,
        title:'Conducteurs | O\'ParcGest - Gestion des conducteurs'
      },
      //modeles
      {
        path:'modeles',
        component:ModelesComponent,
        title:'Modèles | O\'ParcGest - Gestion des modèles de véhicules'
      },
      //vehicules
      {
        path:'vehicules',
        component:VehiculesComponent,
        title:'Véhicules | O\'ParcGest - Gestion du parc automobile'
      },
      //directions
      {
        path:'directions',
        component:DirectionsComponent,
        title:'Directions | O\'ParcGest - Gestion des directions'
      },
      //missions
      {
        path:'missions',
        component:MissionsComponent,
        title:'Missions | O\'ParcGest - Gestion des missions'
      },
      //vidanges
      {
        path:'vidanges',
        component:VidangesComponent,
        title:'Vidanges | O\'ParcGest - Suivi des vidanges'
      },
      //visites-techniques
      {
        path:'visites-techniques',
        component:VisistesTechniquesComponent,
        title:'Visites Techniques | O\'ParcGest - Contrôles techniques'
      },
      //pannes
      {
        path:'pannes',
        component:PannesComponent,
        title:'Pannes | O\'ParcGest - Gestion des pannes'
      },
      //dotations-carburant
      {
        path:'dotations-carburant',
        component:DotationsCarburantComponent,
        title:'Dotations Carburant | O\'ParcGest - Allocation de carburant'
      },
    ]
  },
  // auth pages
  {
    path:'signin',
    component:SignInComponent,
    title:'Angular Sign In Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  {
    path:'signup',
    component:SignUpComponent,
    title:'Angular Sign Up Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  // error pages
  {
    path:'**',
    component:NotFoundComponent,
    title:'Angular NotFound Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
];
