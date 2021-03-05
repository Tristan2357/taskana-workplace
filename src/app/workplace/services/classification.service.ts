import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassificationSummary } from '../models/classification-summary';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'any'
})
export class ClassificationService {

  constructor(private http: HttpClient) {
  }

  getClassifications(): Observable<{ classifications: ClassificationSummary[] }> {
    return this.http.get<{ classifications: ClassificationSummary[] }>(`${environment.taskanaRestUrl}/api/v1/classifications`);
  }
}
