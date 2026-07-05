import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CaseStudy } from '../models/case-study.model';
import { ListResponse } from '../models/common.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  private readonly api = inject(ApiBaseService);

  list(): Observable<ListResponse<CaseStudy>> {
    return this.api.get<ListResponse<CaseStudy>>('/case-studies');
  }

  get(slug: string): Observable<CaseStudy> {
    return this.api.get<CaseStudy>(`/case-studies/${slug}`);
  }
}
