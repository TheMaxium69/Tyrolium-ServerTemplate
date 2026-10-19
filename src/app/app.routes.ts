import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { tyroUiErrorRoutes, TyroUiSeo, tyroUiLocalizedRoutes } from 'tyrolium-ui';

/* ─── SEO (titre + description par page, FR / EN) ─────────────────────── */

const SEO_HOME: TyroUiSeo = {
  fullTitle:   { fr: 'Serveur opérationnel - Tyrolium / SolidServ', en: 'Server operational - Tyrolium / SolidServ' },
  description: { fr: 'Page de statut des serveurs Tyrolium / SolidServ : disponibilité des services en temps réel.', en: 'Tyrolium / SolidServ server status page: real-time service availability.' },
};

export const routes: Routes = tyroUiLocalizedRoutes([
  { path: '',    component: Home, data: { seo: SEO_HOME } },
  ...tyroUiErrorRoutes(),
]);
