import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';

import { CapabilitiesService } from '../../core/services/capabilities.service';
import { CaseStudyService } from '../../core/services/case-study.service';
import { ProductLabService } from '../../core/services/product-lab.service';
import { ProfileService } from '../../core/services/profile.service';
import { ProjectsService } from '../../core/services/projects.service';
import { UpdatesService } from '../../core/services/updates.service';

import { Capabilities } from '../../core/models/capabilities.model';
import { CaseStudy } from '../../core/models/case-study.model';
import { ProductLabItem } from '../../core/models/product-lab.model';
import { Profile } from '../../core/models/profile.model';
import { Project } from '../../core/models/project.model';
import { UpdateItem } from '../../core/models/update.model';

import { BadgeComponent } from '../../shared/components/badge.component';
import { CapabilityGroupComponent } from '../../shared/components/capability-group.component';
import { CaseStudyCardComponent } from '../../shared/components/case-study-card.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { FounderSnapshotComponent } from '../../shared/components/founder-snapshot.component';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { ProjectCardComponent } from '../../shared/components/project-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header.component';
import { UpdateTimelineComponent } from '../../shared/components/update-timeline.component';

@Component({
  selector: 'yh-home',
  standalone: true,
  imports: [
    BadgeComponent,
    CapabilityGroupComponent,
    CaseStudyCardComponent,
    CtaButtonComponent,
    FounderSnapshotComponent,
    ProductCardComponent,
    ProjectCardComponent,
    SectionHeaderComponent,
    UpdateTimelineComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly productLabService = inject(ProductLabService);
  private readonly caseStudyService = inject(CaseStudyService);
  private readonly updatesService = inject(UpdatesService);
  private readonly capabilitiesService = inject(CapabilitiesService);
  private readonly projectsService = inject(ProjectsService);

  readonly profile = signal<Profile | null>(null);
  readonly productLab = signal<ProductLabItem[]>([]);
  readonly caseStudies = signal<CaseStudy[]>([]);
  readonly updates = signal<UpdateItem[]>([]);
  readonly capabilities = signal<Capabilities | null>(null);
  readonly projects = signal<Project[]>([]);
  readonly loaded = signal(false);

  readonly productPreview = computed(() => this.productLab().slice(0, 3));
  readonly casePreview = computed(() => this.caseStudies().slice(0, 2));
  readonly updatePreview = computed(() => this.updates().slice(0, 4));
  readonly projectPreview = computed(() =>
    this.projects().filter((p) => p.highlight).slice(0, 3),
  );

  ngOnInit(): void {
    forkJoin({
      profile: this.profileService.getProfile(),
      product: this.productLabService.list(),
      cases: this.caseStudyService.list(),
      updates: this.updatesService.list(),
      capabilities: this.capabilitiesService.get(),
      projects: this.projectsService.list(),
    }).subscribe({
      next: (res) => {
        this.profile.set(res.profile);
        this.productLab.set(res.product.items);
        this.caseStudies.set(res.cases.items);
        this.updates.set(res.updates.items);
        this.capabilities.set(res.capabilities);
        this.projects.set(res.projects.items);
        this.loaded.set(true);
      },
    });
  }

  ordinal(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
