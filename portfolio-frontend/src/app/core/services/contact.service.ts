import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactRequest, ContactResponse } from '../models/common.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly api = inject(ApiBaseService);

  submit(payload: ContactRequest): Observable<ContactResponse> {
    return this.api.post<ContactRequest, ContactResponse>('/contact', payload);
  }
}
