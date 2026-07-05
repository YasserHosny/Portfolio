import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'yh-section-header',
  standalone: true,
  template: `
    <header class="header">
      @if (eyebrow) {
        <span class="eyebrow">{{ eyebrow }}</span>
      }
      @if (level === 'h1') {
        <h1 class="title">{{ title }}</h1>
      } @else {
        <h2 class="title">{{ title }}</h2>
      }
      @if (subtitle) {
        <p class="subtitle">{{ subtitle }}</p>
      }
    </header>
  `,
  styles: [
    `
      .header {
        max-width: 720px;
        margin: 0 auto 2.5rem;
        text-align: center;
      }
      .title {
        margin: 0.25rem 0 0.75rem;
      }
      .subtitle {
        color: var(--color-text-secondary);
        font-size: 1.05rem;
      }
      :host(.left) .header {
        text-align: left;
        margin-left: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() eyebrow?: string;
  @Input() subtitle?: string;
  /** `h1` for landing-page headers (one per page), `h2` for in-page section dividers. */
  @Input() level: 'h1' | 'h2' = 'h2';
}
