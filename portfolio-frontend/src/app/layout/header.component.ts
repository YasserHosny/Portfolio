import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CtaButtonComponent } from '../shared/components/cta-button.component';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'yh-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CtaButtonComponent],
  template: `
    <header class="hdr" [class.hdr--scrolled]="scrolled()">
      <div class="container hdr__inner">
        <a routerLink="/" class="brand" aria-label="Yasser Hosny — Founder Engineer home">
          <span class="brand__mark" aria-hidden="true">YH</span>
          <span class="brand__label">
            <span class="brand__name">Yasser Hosny</span>
            <span class="brand__tag">Founder Engineer</span>
          </span>
        </a>

        <nav class="nav" [class.nav--open]="menuOpen()" aria-label="Primary">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="nav__link--active"
              [routerLinkActiveOptions]="{ exact: !!link.exact }"
              class="nav__link"
              (click)="close()"
            >
              {{ link.label }}
            </a>
          }
          <yh-cta-button link="/contact" variant="primary">Let's Build →</yh-cta-button>
        </nav>

        <button
          type="button"
          class="burger"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="primary-nav"
          aria-label="Toggle menu"
          (click)="toggle()"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styles: [
    `
      .hdr {
        position: sticky;
        top: 0;
        z-index: 40;
        backdrop-filter: blur(14px);
        background: rgba(11, 17, 32, 0.65);
        border-bottom: 1px solid transparent;
        transition: background var(--transition-med), border-color var(--transition-med);
      }
      .hdr--scrolled {
        background: rgba(11, 17, 32, 0.9);
        border-bottom-color: var(--color-border-soft);
      }
      .hdr__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 0.9rem;
        padding-bottom: 0.9rem;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.7rem;
        color: var(--color-text-main);
      }
      .brand__mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        color: #0B1120;
        font-family: var(--font-code);
        font-weight: 700;
        letter-spacing: 0.05em;
      }
      .brand__label { display: flex; flex-direction: column; line-height: 1.05; }
      .brand__name { font-weight: 600; font-size: 1rem; }
      .brand__tag {
        font-family: var(--font-code);
        color: var(--color-secondary);
        font-size: 0.72rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .nav {
        display: flex;
        align-items: center;
        gap: 1.25rem;
      }
      .nav__link {
        color: var(--color-text-secondary);
        font-size: 0.92rem;
        font-weight: 500;
        padding: 0.4rem 0;
        border-bottom: 2px solid transparent;
        transition: color var(--transition-fast), border-color var(--transition-fast);
      }
      .nav__link:hover { color: var(--color-text-main); }
      .nav__link--active {
        color: var(--color-primary);
        border-bottom-color: var(--color-primary);
      }
      .burger {
        display: none;
        flex-direction: column;
        gap: 5px;
        width: 40px;
        height: 40px;
        border: 1px solid var(--color-border);
        border-radius: 10px;
        background: rgba(15, 23, 42, 0.6);
        cursor: pointer;
        justify-content: center;
        align-items: center;
      }
      .burger span {
        width: 18px;
        height: 2px;
        background: var(--color-text-main);
      }

      @media (max-width: 860px) {
        .burger { display: inline-flex; }
        .nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          flex-direction: column;
          align-items: stretch;
          gap: 0.75rem;
          padding: 1rem 1.5rem 1.5rem;
          background: rgba(11, 17, 32, 0.98);
          border-bottom: 1px solid var(--color-border-soft);
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-fast), transform var(--transition-fast);
        }
        .nav--open { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .nav__link { border-bottom: 1px solid var(--color-border-soft); padding: 0.65rem 0; }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  readonly links: NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Product Lab', path: '/product-lab' },
    { label: 'Projects', path: '/projects' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'About', path: '/about' },
    { label: 'Updates', path: '/updates' },
    { label: 'Contact', path: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 12);
  }

  toggle() { this.menuOpen.update((open) => !open); }
  close() { this.menuOpen.set(false); }
}
