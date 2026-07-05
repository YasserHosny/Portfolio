import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ListResponse } from '../models/common.model';
import { Project } from '../models/project.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly api = inject(ApiBaseService);

  list(): Observable<ListResponse<Project>> {
    return this.api.get<ListResponse<Project>>('/projects');
  }
}
