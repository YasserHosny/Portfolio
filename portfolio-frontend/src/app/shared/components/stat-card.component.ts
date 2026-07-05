import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'yh-stat-card',
  standalone: true,
  template: `
    <div class="stat">
      <span class="stat__label">{{ label }}</span>
      <span class="stat__value">{{ value }}</span>
    </div>
  `,
  styles: [
    `
      .stat {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 1rem 1.1rem;
        border-radius: var(--radius-md);
        background: rgba(15, 23, 42, 0.5);
        border: 1px solid var(--color-border-soft);
      }
      .stat__label {
        font-family: var(--font-code);
        font-size: 0.7rem;
        letter-spacing: 0.14em;
        color: var(--color-text-muted);
        text-transform: uppercase;
      }
      .stat__value {
        font-size: 0.95rem;
        color: var(--color-text-main);
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
}
