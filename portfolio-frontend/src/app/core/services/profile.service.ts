import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Profile } from '../models/profile.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly api = inject(ApiBaseService);
  private cache$?: Observable<Profile>;

  getProfile(): Observable<Profile> {
    if (!this.cache$) {
      this.cache$ = this.api.get<Profile>('/profile').pipe(shareReplay(1));
    }
    return this.cache$;
  }
}
