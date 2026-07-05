import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ProductLabItem } from '../../core/models/product-lab.model';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'yh-product-card',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <article class="surface surface--hover product">
      <header class="product__head">
        <span class="product__status">
          <span class="dot" aria-hidden="true"></span>
          {{ item.status }}
        </span>
        <h3 class="product__title">{{ item.title }}</h3>
        <p class="product__desc">{{ item.description }}</p>
      </header>

      <dl class="product__meta">
        <div>
          <dt>Problem</dt>
          <dd>{{ item.problem }}</dd>
        </div>
        <div>
          <dt>Target users</dt>
          <dd>{{ item.target_users }}</dd>
        </div>
        <div>
          <dt>MVP scope</dt>
          <dd>
            <ul>
              @for (step of item.mvp_scope; track step) {
                <li>{{ step }}</li>
              }
            </ul>
          </dd>
        </div>
      </dl>

      <footer class="product__foot">
        <div class="product__tags">
          @for (tag of item.tags; track tag) {
            <yh-badge tone="primary">{{ tag }}</yh-badge>
          }
        </div>
      </footer>
    </article>
  `,
  styles: [
    `
      .product {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        height: 100%;
      }
      .product__status {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-code);
        font-size: 0.72rem;
        color: var(--color-secondary);
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--color-secondary);
        box-shadow: 0 0 12px rgba(20, 184, 166, 0.7);
      }
      .product__title {
        margin: 0.5rem 0 0.4rem;
      }
      .product__desc {
        margin: 0;
        color: var(--color-text-secondary);
      }
      .product__meta {
        margin: 0;
        display: grid;
        gap: 0.7rem;
      }
      .product__meta div {
        display: grid;
        gap: 0.15rem;
      }
      .product__meta dt {
        font-family: var(--font-code);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        color: var(--color-text-muted);
      }
      .product__meta dd {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: 0.95rem;
      }
      .product__meta ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.2rem;
      }
      .product__meta li {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        position: relative;
        padding-left: 1rem;
      }
      .product__meta li::before {
        content: "▸";
        color: var(--color-primary);
        position: absolute;
        left: 0;
      }
      .product__foot {
        margin-top: auto;
        padding-top: 0.5rem;
        border-top: 1px dashed var(--color-border-soft);
      }
      .product__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) item!: ProductLabItem;
}
