import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ListResponse } from '../models/common.model';
import { ProductLabItem } from '../models/product-lab.model';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ProductLabService {
  private readonly api = inject(ApiBaseService);

  list(): Observable<ListResponse<ProductLabItem>> {
    return this.api.get<ListResponse<ProductLabItem>>('/product-lab');
  }

  get(slug: string): Observable<ProductLabItem> {
    return this.api.get<ProductLabItem>(`/product-lab/${slug}`);
  }
}
