import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

type IconName = 'linkedin' | 'email' | 'github';

/**
 * A single row in a contact / social link list.
 *
 * Renders a monochrome inline SVG icon (`currentColor`, so it inherits the
 * surrounding text color), followed by a label. Optionally shows a
 * copy-to-clipboard button — useful for email addresses.
 */
@Component({
  selector: 'yh-link-row',
  standalone: true,
  template: `
    <div class="row">
      <span class="row__icon" aria-hidden="true">
        @if (icon === 'linkedin') {
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v16H.22V8zM8.5 8h4.37v2.19h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V24h-4.55v-7.16c0-1.71-.03-3.91-2.38-3.91-2.38 0-2.75 1.86-2.75 3.79V24H8.5V8z" />
          </svg>
        } @else if (icon === 'email') {
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="M3 6l9 7 9-7" />
          </svg>
        } @else if (icon === 'github') {
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.98.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.26 5.69.41.35.78 1.04.78 2.1v3.11c0 .3.21.67.8.55 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        }
      </span>

      @if (href) {
        <a
          class="row__label"
          [href]="href"
          [attr.target]="external ? '_blank' : null"
          [attr.rel]="external ? 'noopener noreferrer' : null"
        >{{ label }}</a>
      } @else {
        <span class="row__label">{{ label }}</span>
      }

      @if (copyValue) {
        <button
          type="button"
          class="row__copy"
          [attr.aria-label]="'Copy ' + (label || copyValue) + ' to clipboard'"
          (click)="copy()"
          [class.row__copy--done]="copied()"
        >{{ copied() ? '✓' : '⧉' }}</button>
      }
    </div>
  `,
  styles: [
    `
      .row {
        display: grid;
        grid-template-columns: 20px 1fr auto;
        align-items: center;
        gap: 0.7rem;
      }
      .row__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        color: inherit;
        opacity: 0.9;
        flex-shrink: 0;
      }
      .row__icon svg {
        width: 100%;
        height: 100%;
      }
      .row__label {
        color: inherit;
        text-decoration: none;
        word-break: break-word;
        line-height: 1.35;
      }
      a.row__label:hover { color: var(--color-primary); text-decoration: underline; }
      .row__copy {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 6px;
        border: 1px solid var(--color-border);
        background: rgba(15, 23, 42, 0.5);
        color: var(--color-text-muted);
        font-family: var(--font-code);
        font-size: 0.85rem;
        cursor: pointer;
        transition: color var(--transition-fast), border-color var(--transition-fast),
                    background var(--transition-fast);
      }
      .row__copy:hover {
        color: var(--color-text-main);
        border-color: var(--color-primary);
      }
      .row__copy--done {
        color: var(--color-success);
        border-color: rgba(34, 197, 94, 0.5);
        background: rgba(34, 197, 94, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkRowComponent {
  @Input({ required: true }) icon!: IconName;
  @Input({ required: true }) label!: string;
  @Input() href?: string;
  @Input() external = true;
  /** If set, shows a copy-to-clipboard button that copies this value. */
  @Input() copyValue?: string;

  readonly copied = signal(false);

  async copy(): Promise<void> {
    if (!this.copyValue) return;
    try {
      await navigator.clipboard.writeText(this.copyValue);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1200);
    } catch {
      /* clipboard denied — swallow, no user-facing error worth showing */
    }
  }
}
