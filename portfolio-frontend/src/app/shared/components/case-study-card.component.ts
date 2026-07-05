import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CaseStudy } from '../../core/models/case-study.model';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'yh-case-study-card',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <article class="surface surface--hover cs">
      <span class="eyebrow">Case Study</span>
      <h3 class="cs__title">{{ item.title }}</h3>

      <div class="cs__section">
        <span class="cs__label">Problem</span>
        <p>{{ item.problem }}</p>
      </div>

      <div class="cs__grid">
        <div>
          <span class="cs__label">My Role</span>
          <p>{{ item.role }}</p>
        </div>
        <div>
          <span class="cs__label">Solution</span>
          <p>{{ item.solution }}</p>
        </div>
      </div>

      <div class="cs__section cs__section--impact">
        <span class="cs__label">Business Impact</span>
        <p>{{ item.business_impact }}</p>
      </div>

      <footer class="cs__tags">
        @for (tag of item.tags; track tag) {
          <yh-badge tone="secondary">{{ tag }}</yh-badge>
        }
      </footer>
    </article>
  `,
  styles: [
    `
      .cs { display: flex; flex-direction: column; gap: 1.1rem; height: 100%; }
      .cs__title { margin: 0.25rem 0 0.5rem; }
      .cs__label {
        font-family: var(--font-code);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        color: var(--color-text-muted);
        display: block;
        margin-bottom: 0.35rem;
      }
      .cs__section p { margin: 0; color: var(--color-text-secondary); }
      .cs__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      .cs__section--impact {
        border-top: 1px dashed var(--color-border-soft);
        padding-top: 1rem;
      }
      .cs__section--impact p { color: var(--color-text-main); font-weight: 500; }
      .cs__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: auto;
        padding-top: 0.4rem;
      }
      @media (max-width: 640px) {
        .cs__grid { grid-template-columns: 1fr; }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyCardComponent {
  @Input({ required: true }) item!: CaseStudy;
}
