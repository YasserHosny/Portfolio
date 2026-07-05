import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UpdateItem } from '../../core/models/update.model';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'yh-update-timeline',
  standalone: true,
  imports: [BadgeComponent, DatePipe],
  template: `
    <ol class="timeline">
      @for (item of items; track item.id) {
        <li class="timeline__row">
          <div class="timeline__stem" aria-hidden="true">
            <span class="dot"></span>
          </div>
          <article class="surface surface--hover timeline__card">
            <header>
              <div class="meta">
                <span class="mono date">{{ item.date | date: 'MMM d, y' }}</span>
                <yh-badge [tone]="toneFor(item.type)">{{ item.type }}</yh-badge>
              </div>
              <h3>{{ item.title }}</h3>
            </header>
            <p>{{ item.description }}</p>
            @if (item.tags.length) {
              <div class="tags">
                @for (tag of item.tags; track tag) {
                  <yh-badge>{{ tag }}</yh-badge>
                }
              </div>
            }
            @if (item.link) {
              <a [href]="item.link" target="_blank" rel="noopener noreferrer" class="link">
                View →
              </a>
            }
          </article>
        </li>
      }
    </ol>
  `,
  styles: [
    `
      .timeline {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 1.5rem;
        position: relative;
      }
      .timeline__row {
        display: grid;
        grid-template-columns: 32px 1fr;
        gap: 0.75rem;
      }
      .timeline__stem {
        position: relative;
        display: flex;
        justify-content: center;
        padding-top: 1.4rem;
      }
      .timeline__stem::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: -1.5rem;
        left: 50%;
        width: 1px;
        background: var(--color-border-soft);
        transform: translateX(-50%);
      }
      .timeline__row:last-child .timeline__stem::before {
        bottom: 60%;
      }
      .dot {
        width: 14px;
        height: 14px;
        border-radius: 999px;
        background: var(--color-primary);
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
        z-index: 1;
      }
      .timeline__card { display: flex; flex-direction: column; gap: 0.7rem; }
      .meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.3rem;
      }
      .date {
        color: var(--color-text-muted);
        font-size: 0.75rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      h3 { margin: 0; font-size: 1.05rem; }
      p { margin: 0; color: var(--color-text-secondary); }
      .tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
      .link {
        font-family: var(--font-code);
        font-size: 0.85rem;
        color: var(--color-secondary);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTimelineComponent {
  @Input({ required: true }) items: UpdateItem[] = [];

  toneFor(type: UpdateItem['type']): 'primary' | 'secondary' | 'success' | 'warning' | 'neutral' {
    switch (type) {
      case 'Certification':
        return 'primary';
      case 'Learning':
        return 'secondary';
      case 'Release':
        return 'success';
      case 'Event':
        return 'warning';
      default:
        return 'neutral';
    }
  }
}
