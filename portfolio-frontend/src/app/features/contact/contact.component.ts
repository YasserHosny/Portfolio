import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContactService } from '../../core/services/contact.service';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../core/models/profile.model';

import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { LinkRowComponent } from '../../shared/components/link-row.component';
import { SectionHeaderComponent } from '../../shared/components/section-header.component';

@Component({
  selector: 'yh-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CtaButtonComponent, LinkRowComponent, SectionHeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly profileService = inject(ProfileService);

  readonly profile = signal<Profile | null>(null);
  readonly submitting = signal(false);
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.maxLength(160)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
  });

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((p) => this.profile.set(p));
  }

  submit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const payload = this.form.getRawValue();
    this.contactService.submit(payload).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.successMessage.set(res.message);
        this.form.reset();
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set('Something went wrong. Please try LinkedIn or email instead.');
      },
    });
  }
}
