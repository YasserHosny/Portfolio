import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Capabilities } from '../models/capabilities.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class CapabilitiesService {
  private readonly api = inject(ApiBaseService);

  get(): Observable<Capabilities> {
    return this.api.get<Capabilities>('/capabilities');
  }
}
