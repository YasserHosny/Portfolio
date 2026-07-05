import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'yh-badge',
  standalone: true,
  template: `<span class="badge" [class]="'badge--' + tone">
    <ng-content />
  </span>`,
  styles: [
    `
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
        font-family: var(--font-code);
        font-size: 0.72rem;
        letter-spacing: 0.03em;
        border: 1px solid var(--color-border-soft);
        color: var(--color-text-secondary);
        background: rgba(15, 23, 42, 0.6);
        white-space: nowrap;
      }
      .badge--primary {
        color: #93c5fd;
        border-color: rgba(59, 130, 246, 0.35);
        background: var(--color-primary-soft);
      }
      .badge--secondary {
        color: #5eead4;
        border-color: rgba(20, 184, 166, 0.35);
        background: var(--color-secondary-soft);
      }
      .badge--success {
        color: #86efac;
        border-color: rgba(34, 197, 94, 0.35);
        background: rgba(34, 197, 94, 0.1);
      }
      .badge--warning {
        color: #fcd34d;
        border-color: rgba(245, 158, 11, 0.35);
        background: rgba(245, 158, 11, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() tone: 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' = 'neutral';
}
