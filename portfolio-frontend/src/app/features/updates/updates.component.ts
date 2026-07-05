import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { UpdatesService } from '../../core/services/updates.service';
import { UpdateItem } from '../../core/models/update.model';

import { SectionHeaderComponent } from '../../shared/components/section-header.component';
import { UpdateTimelineComponent } from '../../shared/components/update-timeline.component';

@Component({
  selector: 'yh-updates',
  standalone: true,
  imports: [SectionHeaderComponent, UpdateTimelineComponent],
  template: `
    <section class="section">
      <div class="container">
        <yh-section-header
          level="h1"
          eyebrow="Latest updates"
          title="Certifications, product ideas, releases, and learning milestones"
          subtitle="A running timeline of what I've shipped, learned, and validated." />

        <yh-update-timeline [items]="items()" />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatesComponent implements OnInit {
  private readonly service = inject(UpdatesService);
  readonly items = signal<UpdateItem[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((res) => this.items.set(res.items));
  }
}
