import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CapabilityGroup } from '../../core/models/capabilities.model';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'yh-capability-group',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <article class="surface surface--hover cap">
      <header class="cap__head">
        <span class="cap__ordinal mono">{{ ordinal }}</span>
        <div>
          <h3>{{ group.group }}</h3>
          <p>{{ group.description }}</p>
        </div>
      </header>
      <div class="cap__items">
        @for (item of group.items; track item) {
          <yh-badge tone="primary">{{ item }}</yh-badge>
        }
      </div>
    </article>
  `,
  styles: [
    `
      .cap { display: flex; flex-direction: column; gap: 1rem; height: 100%; }
      .cap__head {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.85rem;
        align-items: start;
      }
      .cap__ordinal {
        font-size: 0.85rem;
        color: var(--color-secondary);
        background: var(--color-secondary-soft);
        border: 1px solid rgba(20, 184, 166, 0.3);
        padding: 0.3rem 0.55rem;
        border-radius: 8px;
      }
      .cap h3 { margin: 0 0 0.25rem; font-size: 1.15rem; }
      .cap p { margin: 0; color: var(--color-text-secondary); font-size: 0.92rem; }
      .cap__items {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapabilityGroupComponent {
  @Input({ required: true }) group!: CapabilityGroup;
  @Input({ required: true }) ordinal!: string;
}
