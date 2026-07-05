import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppShellComponent } from './layout/app-shell.component';

@Component({
  selector: 'yh-root',
  standalone: true,
  imports: [RouterOutlet, AppShellComponent],
  template: `
    <yh-app-shell>
      <router-outlet />
    </yh-app-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
