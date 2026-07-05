import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { ProductLabService } from '../../core/services/product-lab.service';
import { ProductLabItem } from '../../core/models/product-lab.model';

import { ProductCardComponent } from '../../shared/components/product-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header.component';

@Component({
  selector: 'yh-product-lab',
  standalone: true,
  imports: [ProductCardComponent, SectionHeaderComponent],
  template: `
    <section class="section">
      <div class="container">
        <yh-section-header
          level="h1"
          eyebrow="Product Lab"
          title="Product ideas, MVPs, and experiments"
          subtitle="Focused on solving real business problems — every entry lists the problem, target users, MVP scope, status, and stack." />

        <div class="grid grid--2">
          @for (item of items(); track item.slug) {
            <yh-product-card [item]="item" />
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLabComponent implements OnInit {
  private readonly service = inject(ProductLabService);
  readonly items = signal<ProductLabItem[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((res) => this.items.set(res.items));
  }
}
