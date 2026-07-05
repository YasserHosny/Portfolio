import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Project } from '../../core/models/project.model';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'yh-project-card',
  standalone: true,
  imports: [BadgeComponent, DatePipe],
  template: `
    <article class="surface surface--hover proj" [class.proj--highlight]="project.highlight">
      <header class="proj__head">
        <div class="proj__title-row">
          <span class="proj__lang mono">{{ project.language }}</span>
          @if (project.highlight) {
            <yh-badge tone="secondary">Highlight</yh-badge>
          }
        </div>
        <h3 class="proj__name">
          <a [href]="project.repo_url" target="_blank" rel="noopener noreferrer">
            {{ project.name }}
          </a>
        </h3>
        @if (project.description) {
          <p class="proj__desc">{{ project.description }}</p>
        } @else {
          <p class="proj__desc proj__desc--muted">No description yet.</p>
        }
      </header>

      <div class="proj__meta">
        <span class="mono">Last push · {{ project.last_push | date: 'MMM d, y' }}</span>
      </div>

      @if (project.tags.length) {
        <div class="proj__tags">
          @for (tag of project.tags; track tag) {
            <yh-badge tone="primary">{{ tag }}</yh-badge>
          }
        </div>
      }

      <footer class="proj__foot">
        <a class="proj__link" [href]="project.repo_url" target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </footer>
    </article>
  `,
  styles: [
    `
      .proj {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        height: 100%;
      }
      .proj--highlight {
        border-color: rgba(20, 184, 166, 0.4);
      }
      .proj__title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }
      .proj__lang {
        font-size: 0.72rem;
        color: var(--color-secondary);
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }
      .proj__name {
        margin: 0.3rem 0 0.5rem;
        font-size: 1.15rem;
      }
      .proj__name a {
        color: var(--color-text-main);
      }
      .proj__name a:hover { color: var(--color-primary); }
      .proj__desc { margin: 0; color: var(--color-text-secondary); }
      .proj__desc--muted { color: var(--color-text-muted); font-style: italic; }
      .proj__meta {
        color: var(--color-text-muted);
        font-size: 0.78rem;
        letter-spacing: 0.06em;
      }
      .proj__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .proj__foot {
        margin-top: auto;
        padding-top: 0.5rem;
        border-top: 1px dashed var(--color-border-soft);
      }
      .proj__link {
        font-family: var(--font-code);
        font-size: 0.85rem;
        color: var(--color-secondary);
      }
      .proj__link:hover { color: #5eead4; }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
