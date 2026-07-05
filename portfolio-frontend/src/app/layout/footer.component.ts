import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProfileService } from '../core/services/profile.service';
import { Profile } from '../core/models/profile.model';

@Component({
  selector: 'yh-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="foot">
      <div class="container foot__inner">
        <div class="foot__col">
          <div class="brand">
            <span class="brand__mark" aria-hidden="true">YH</span>
            <div>
              <span class="brand__name">Yasser Hosny, MBA</span>
              <span class="brand__tag mono">Founder Engineer</span>
            </div>
          </div>
          <p>
            Building scalable software products, enterprise platforms, and
            AI-powered solutions.
          </p>
        </div>

        <div class="foot__col">
          <h4>Explore</h4>
          <ul>
            <li><a routerLink="/product-lab">Product Lab</a></li>
            <li><a routerLink="/projects">Projects</a></li>
            <li><a routerLink="/case-studies">Case Studies</a></li>
            <li><a routerLink="/about">About</a></li>
            <li><a routerLink="/updates">Updates</a></li>
            <li><a routerLink="/contact">Contact</a></li>
          </ul>
        </div>

        <div class="foot__col">
          <h4>Contact</h4>
          @if (profile(); as p) {
            <ul>
              <li>
                <a [href]="p.contact.linkedin" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a [href]="'mailto:' + p.contact.email">{{ p.contact.email }}</a>
              </li>
              @if (p.contact.email_secondary) {
                <li>
                  <a [href]="'mailto:' + p.contact.email_secondary">
                    {{ p.contact.email_secondary }}
                  </a>
                </li>
              }
              @if (p.contact.github) {
                <li>
                  <a [href]="p.contact.github" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              }
            </ul>
          }
        </div>
      </div>

      <div class="container foot__legal">
        <span class="mono">© {{ year }} Yasser Hosny · Built as a Founder Operating System</span>
      </div>
    </footer>
  `,
  styles: [
    `
      .foot {
        margin-top: 5rem;
        border-top: 1px solid var(--color-border-soft);
        background: rgba(11, 17, 32, 0.5);
        padding: 3rem 0 1.5rem;
      }
      .foot__inner {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr;
        gap: 2rem;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        margin-bottom: 0.75rem;
      }
      .brand__mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        color: #0B1120;
        font-family: var(--font-code);
        font-weight: 700;
      }
      .brand__name { display: block; font-weight: 600; }
      .brand__tag { display: block; font-size: 0.72rem; color: var(--color-secondary); }
      h4 {
        font-family: var(--font-code);
        font-size: 0.75rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        margin: 0 0 1rem;
      }
      ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.55rem; }
      a { color: var(--color-text-secondary); }
      a:hover { color: var(--color-primary); }
      .foot__legal {
        margin-top: 2.5rem;
        border-top: 1px dashed var(--color-border-soft);
        padding-top: 1.25rem;
        color: var(--color-text-muted);
        font-size: 0.75rem;
      }
      @media (max-width: 768px) {
        .foot__inner { grid-template-columns: 1fr; }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  readonly profile = signal<Profile | null>(null);
  readonly year = new Date().getFullYear();

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (p) => this.profile.set(p),
      error: () => {},
    });
  }
}
