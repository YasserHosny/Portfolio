import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Yasser Hosny, MBA — Founder Engineer',
  },
  {
    path: 'product-lab',
    loadComponent: () =>
      import('./features/product-lab/product-lab.component').then(
        (m) => m.ProductLabComponent,
      ),
    title: 'Product Lab — Yasser Hosny',
  },
  {
    path: 'case-studies',
    loadComponent: () =>
      import('./features/case-studies/case-studies.component').then(
        (m) => m.CaseStudiesComponent,
      ),
    title: 'Case Studies — Yasser Hosny',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
    title: 'Projects — Yasser Hosny',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'About — Yasser Hosny',
  },
  {
    path: 'updates',
    loadComponent: () =>
      import('./features/updates/updates.component').then((m) => m.UpdatesComponent),
    title: 'Updates — Yasser Hosny',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact — Yasser Hosny',
  },
  { path: '**', redirectTo: '' },
];
