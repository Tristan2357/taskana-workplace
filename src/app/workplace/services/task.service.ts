import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Filter from '../models/filter';
import { TaskResource } from '../models/task-resource';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task';

@Injectable({providedIn: 'any'})
export class TaskService {

  get url(): string {
    return `${environment.taskanaRestUrl}/v1/tasks`;
  }

  constructor(private http: HttpClient) {
  }

  getTasks(filter?: Filter): Observable<TaskResource> {
    let params = new HttpParams();
    if (filter) {
      Object.keys(filter).forEach(key => {
        if (typeof filter[key][0] !== 'undefined' && !!filter[key][0]) {
          params = params.append(key, filter[key]);
        }
      });
    }
    return this.http.get<TaskResource>(this.url, {params});
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${taskId}`);
  }

  completeTask(taskId: string): Observable<Task> {
    return this.http.post<Task>(`${this.url}/${taskId}/complete`, '');
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${task.taskId}`, task);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.url}/${taskId}`);
  }

  claimTask(taskId: string): Observable<Task> {
    return this.http.post<Task>(`${this.url}/${taskId}/claim`, '');
  }

  cancelClaimTask(taskId: string): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/${taskId}/claim`);
  }

  transferTask(taskId: string, workbasketId: string): Observable<Task> {
    return this.http.post<Task>(`${this.url}/${taskId}/transfer/${workbasketId}`, '');
  }
}
