import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'yh-cta-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    <ng-template #label><ng-content /></ng-template>

    @if (link) {
      <a
        [routerLink]="link"
        class="cta"
        [class.cta--ghost]="variant === 'ghost'"
        [class.cta--outline]="variant === 'outline'"
      >
        <ng-container *ngTemplateOutlet="label" />
      </a>
    } @else if (href) {
      <a
        [href]="href"
        [attr.target]="external ? '_blank' : null"
        [attr.rel]="external ? 'noopener noreferrer' : null"
        class="cta"
        [class.cta--ghost]="variant === 'ghost'"
        [class.cta--outline]="variant === 'outline'"
      >
        <ng-container *ngTemplateOutlet="label" />
      </a>
    } @else {
      <button
        type="button"
        class="cta"
        [class.cta--ghost]="variant === 'ghost'"
        [class.cta--outline]="variant === 'outline'"
      >
        <ng-container *ngTemplateOutlet="label" />
      </button>
    }
  `,
  styles: [
    `
      :host { display: inline-flex; }
      .cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.85rem 1.4rem;
        border-radius: var(--radius-md);
        background: var(--color-primary);
        color: #fff;
        font-weight: 600;
        font-size: 0.95rem;
        border: 1px solid transparent;
        cursor: pointer;
        text-decoration: none;
        transition:
          transform var(--transition-fast),
          background var(--transition-fast),
          box-shadow var(--transition-fast),
          border-color var(--transition-fast);
        box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
      }
      .cta:hover {
        background: #2563eb;
        transform: translateY(-1px);
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.35);
      }
      .cta--ghost {
        background: transparent;
        color: var(--color-text-main);
        border-color: var(--color-border);
        box-shadow: none;
      }
      .cta--ghost:hover {
        background: var(--color-surface-hover);
        border-color: var(--color-primary);
      }
      .cta--outline {
        background: transparent;
        color: var(--color-secondary);
        border-color: var(--color-secondary);
        box-shadow: none;
      }
      .cta--outline:hover {
        background: var(--color-secondary-soft);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtonComponent {
  @Input() link?: string;
  @Input() href?: string;
  @Input() external = false;
  @Input() variant: 'primary' | 'ghost' | 'outline' = 'primary';
}
