import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { CaseStudyService } from '../../core/services/case-study.service';
import { CaseStudy } from '../../core/models/case-study.model';

import { CaseStudyCardComponent } from '../../shared/components/case-study-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header.component';

@Component({
  selector: 'yh-case-studies',
  standalone: true,
  imports: [CaseStudyCardComponent, SectionHeaderComponent],
  template: `
    <section class="section">
      <div class="container">
        <yh-section-header
          level="h1"
          eyebrow="Case Studies"
          title="Real engagements — Problem, Role, Solution, Impact"
          subtitle="Enterprise engineering leadership, NLP and big data intelligence platforms, CRM systems, and ERP for multiple business domains." />

        <div class="grid grid--2">
          @for (cs of items(); track cs.slug) {
            <yh-case-study-card [item]="cs" />
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesComponent implements OnInit {
  private readonly service = inject(CaseStudyService);
  readonly items = signal<CaseStudy[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((res) => this.items.set(res.items));
  }
}
