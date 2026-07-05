import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ListResponse } from '../models/common.model';
import { UpdateItem } from '../models/update.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class UpdatesService {
  private readonly api = inject(ApiBaseService);

  list(): Observable<ListResponse<UpdateItem>> {
    return this.api.get<ListResponse<UpdateItem>>('/updates');
  }
}
