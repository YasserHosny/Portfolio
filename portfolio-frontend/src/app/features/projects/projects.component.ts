import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';

import { Project } from '../../core/models/project.model';
import { ProjectsService } from '../../core/services/projects.service';

import { BadgeComponent } from '../../shared/components/badge.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { ProjectCardComponent } from '../../shared/components/project-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header.component';

@Component({
  selector: 'yh-projects',
  standalone: true,
  imports: [BadgeComponent, CtaButtonComponent, ProjectCardComponent, SectionHeaderComponent],
  template: `
    <section class="section">
      <div class="container">
        <yh-section-header
          eyebrow="Open source"
          title="Projects on GitHub"
          subtitle="Every public repo — code that exists, not just concepts. From payment gateways to LLM-powered voice APIs and a .NET AutoMapper contribution." />

        <div class="tools">
          <div class="filters">
            <button
              type="button"
              class="filter"
              [class.filter--active]="activeLang() === null"
              (click)="filter(null)">
              All ({{ projects().length }})
            </button>
            @for (lang of languages(); track lang.name) {
              <button
                type="button"
                class="filter"
                [class.filter--active]="activeLang() === lang.name"
                (click)="filter(lang.name)">
                {{ lang.name }} ({{ lang.count }})
              </button>
            }
          </div>
          <yh-cta-button href="https://github.com/YasserHosny" [external]="true" variant="outline">
            Full GitHub profile →
          </yh-cta-button>
        </div>

        <div class="grid grid--3">
          @for (project of visible(); track project.slug) {
            <yh-project-card [project]="project" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .tools {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.75rem;
      }
      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .filter {
        padding: 0.4rem 0.85rem;
        border-radius: 999px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        font-family: var(--font-code);
        font-size: 0.78rem;
        cursor: pointer;
        transition: color var(--transition-fast), border-color var(--transition-fast),
                    background var(--transition-fast);
      }
      .filter:hover { color: var(--color-text-main); border-color: var(--color-primary); }
      .filter--active {
        background: var(--color-primary-soft);
        color: #93c5fd;
        border-color: rgba(59, 130, 246, 0.55);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private readonly service = inject(ProjectsService);

  readonly projects = signal<Project[]>([]);
  readonly activeLang = signal<string | null>(null);

  readonly languages = computed(() => {
    const counts = new Map<string, number>();
    for (const p of this.projects()) {
      counts.set(p.language, (counts.get(p.language) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  });

  readonly visible = computed(() => {
    const lang = this.activeLang();
    if (!lang) return this.projects();
    return this.projects().filter((p) => p.language === lang);
  });

  ngOnInit(): void {
    this.service.list().subscribe((res) => this.projects.set(res.items));
  }

  filter(lang: string | null): void {
    this.activeLang.set(lang);
  }
}
