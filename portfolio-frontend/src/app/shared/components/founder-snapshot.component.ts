import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SnapshotItem } from '../../core/models/profile.model';
import { StatCardComponent } from './stat-card.component';

@Component({
  selector: 'yh-founder-snapshot',
  standalone: true,
  imports: [StatCardComponent],
  template: `
    <aside class="snapshot" aria-label="Founder Engineer snapshot">
      <div class="snapshot__head">
        <div class="dot-cluster" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="snapshot__avatar" aria-hidden="true">
          <img src="/assets/yasser-hosny.jpg" alt="" width="44" height="44" loading="eager" decoding="async" />
        </div>
        <div class="snapshot__title">
          <span class="eyebrow">Founder Engineer</span>
          <h3>Snapshot</h3>
        </div>
      </div>

      <div class="snapshot__grid">
        @for (item of snapshot; track item.label) {
          <yh-stat-card [label]="item.label" [value]="item.value" />
        }
      </div>

      <div class="snapshot__flow" aria-label="Delivery flow">
        <span class="flow-title">Delivery flow</span>
        <div class="flow-track">
          @for (step of flow; track step; let last = $last) {
            <span class="flow-step">{{ step }}</span>
            @if (!last) {
              <span class="flow-arrow" aria-hidden="true">→</span>
            }
          }
        </div>
      </div>
    </aside>
  `,
  styles: [
    `
      .snapshot {
        background: linear-gradient(180deg, rgba(30, 41, 59, 0.9), rgba(11, 17, 32, 0.9));
        border: 1px solid var(--color-border-soft);
        border-radius: var(--radius-xl);
        padding: 1.4rem;
        box-shadow: var(--shadow-card);
        position: relative;
        overflow: hidden;
      }
      .snapshot::before {
        content: "";
        position: absolute;
        top: -50%;
        right: -30%;
        width: 60%;
        height: 100%;
        background: radial-gradient(closest-side, rgba(59, 130, 246, 0.25), transparent 70%);
        pointer-events: none;
      }
      .snapshot__head {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        margin-bottom: 1.2rem;
      }
      .dot-cluster {
        display: inline-flex;
        gap: 6px;
      }
      .dot-cluster span {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: var(--color-border);
      }
      .dot-cluster span:nth-child(1) { background: #f87171; }
      .dot-cluster span:nth-child(2) { background: #fbbf24; }
      .dot-cluster span:nth-child(3) { background: #34d399; }
      .snapshot__avatar {
        width: 44px;
        height: 44px;
        border-radius: 999px;
        overflow: hidden;
        border: 2px solid rgba(59, 130, 246, 0.55);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        flex-shrink: 0;
        margin-left: 0.25rem;
      }
      .snapshot__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 25%;
        display: block;
      }
      .snapshot__title h3 {
        margin: 0;
        font-size: 1.1rem;
      }
      .snapshot__grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.7rem;
        margin-bottom: 1.4rem;
      }
      .snapshot__flow {
        border-top: 1px dashed var(--color-border-soft);
        padding-top: 1rem;
      }
      .flow-title {
        display: block;
        font-family: var(--font-code);
        font-size: 0.7rem;
        letter-spacing: 0.14em;
        color: var(--color-text-muted);
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      .flow-track {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.55rem;
        align-items: center;
      }
      .flow-step {
        font-family: var(--font-code);
        font-size: 0.78rem;
        color: var(--color-text-main);
        padding: 0.3rem 0.6rem;
        border: 1px solid var(--color-border);
        border-radius: 6px;
        background: rgba(15, 23, 42, 0.5);
      }
      .flow-arrow {
        color: var(--color-secondary);
        font-family: var(--font-code);
      }
      @media (max-width: 480px) {
        .snapshot__grid { grid-template-columns: 1fr; }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FounderSnapshotComponent {
  @Input({ required: true }) snapshot: SnapshotItem[] = [];
  @Input({ required: true }) flow: string[] = [];
}
