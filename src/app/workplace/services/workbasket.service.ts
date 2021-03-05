import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { WorkbasketResource } from '../models/workbasket-resource';

@Injectable({
  providedIn: 'any'
})
export class WorkbasketService {

  constructor(private http: HttpClient) { }

  getWorkbaskets(): Observable<WorkbasketResource> {
    return this.http.get<WorkbasketResource>(`${environment.taskanaRestUrl}/api/v1/workbaskets`);
  }
}
