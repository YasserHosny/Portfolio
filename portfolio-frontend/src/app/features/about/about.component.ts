import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../core/models/profile.model';

import { BadgeComponent } from '../../shared/components/badge.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { SectionHeaderComponent } from '../../shared/components/section-header.component';

@Component({
  selector: 'yh-about',
  standalone: true,
  imports: [BadgeComponent, CtaButtonComponent, SectionHeaderComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  readonly profile = signal<Profile | null>(null);

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((p) => this.profile.set(p));
  }
}
