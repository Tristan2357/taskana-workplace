import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WorkbasketResource } from '../models/workbasket-resource';
import { Workbasket } from '../models/workbasket';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class WorkbasketService {

  workbaskets: Workbasket[];

  constructor(private http: HttpClient) {
    this.getWorkbaskets();
  }

  async getWorkbaskets(): Promise<Workbasket[]> {
    if (this.workbaskets) {
      return this.workbaskets;
    }
    this.workbaskets = (await this.http.get<WorkbasketResource>(`${environment.taskanaRestUrl}/v1/workbaskets`)
    .pipe(take(1)).toPromise()).workbaskets;
    return this.workbaskets;
  }
}
