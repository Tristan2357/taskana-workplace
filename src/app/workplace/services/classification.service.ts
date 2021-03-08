import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassificationSummary } from '../models/classification-summary';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class ClassificationService {

  classifications: ClassificationSummary[];

  constructor(private http: HttpClient) {
  }

  async getClassifications(): Promise<ClassificationSummary[]> {
    if (this.classifications) {
      return this.classifications;
    }
    this.classifications = (await this.http.get<{ classifications: ClassificationSummary[] }>(`${environment.taskanaRestUrl}/v1/classifications`)
    .pipe(take(1)).toPromise()).classifications;
    return this.classifications;
  }
}
