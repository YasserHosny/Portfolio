import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'yh-app-shell',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
    <yh-header />
    <main class="main">
      <ng-content />
    </main>
    <yh-footer />
  `,
  styles: [
    `
      .main { min-height: 60vh; }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {}
