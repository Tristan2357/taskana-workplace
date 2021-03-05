import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';
import {
  CancelClaim,
  ClaimTask,
  CompleteTask,
  DeleteTask,
  GetTasks,
  SaveTask,
  SelectTask,
  SetCreateTask,
  TransferTask
} from './task.actions';
import { TaskService } from '../services/task.service';
import { map, take, tap } from 'rxjs/operators';


export interface TaskStateModel {
  creating: boolean;
  selectedTask: Task;
  tasks: Task[];
}

@Injectable()
@State<TaskStateModel>({name: 'task', defaults: {creating: false, selectedTask: null, tasks: null}})
export class TaskState {

  constructor(private taskService: TaskService) {
  }

  // TODO update tasks, after delete, update etc

  @Action(GetTasks)
  getTasks(ctx: StateContext<TaskStateModel>, action: GetTasks): Observable<Task[]> {
    return this.handleSubscribe(this.taskService.getTasks(action.filter).pipe(take(1),
      map(taskResource => (taskResource.tasks as Task[])),
      tap(tasks => ctx.patchState({tasks}))));
  }

  @Action(SelectTask)
  selectTask(ctx: StateContext<TaskStateModel>, action: SelectTask): Observable<any> {
    return this.handleSubscribe(this.taskService.getTaskById(action.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({selectedTask, creating: false})
      )));
  }

  @Action(CompleteTask)
  completeTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    return this.handleSubscribe(this.taskService.completeTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({selectedTask}))));
  }

  @Action(SaveTask)
  saveTask(ctx: StateContext<TaskStateModel>, action: SaveTask): Observable<any> {
    if (ctx.getState().creating) {
      return this.handleSubscribe(this.taskService.createTask(action.task).pipe(take(1),
        tap(selectedTask => ctx.patchState({selectedTask, creating: false}))));
    } else {
      return this.handleSubscribe(this.taskService.updateTask(action.task).pipe(take(1),
        tap(selectedTask => ctx.patchState({selectedTask, creating: false}))));
    }
  }

  @Action(SetCreateTask)
  createTask(ctx: StateContext<TaskStateModel>): Observable<void> {
    ctx.patchState({selectedTask: new Task(), creating: true});
    return of();
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    return this.handleSubscribe(this.taskService.deleteTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(() => ctx.patchState({selectedTask: null}))));
  }

  @Action(ClaimTask)
  claimTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    return this.handleSubscribe(this.taskService.claimTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({selectedTask}))));
  }

  @Action(CancelClaim)
  cancelClaim(ctx: StateContext<TaskStateModel>): Observable<any> {
    return this.handleSubscribe(this.taskService.cancelClaimTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({selectedTask}))));
  }

  @Action(TransferTask)
  transferTask(ctx: StateContext<TaskStateModel>, action: TransferTask): Observable<any> {
    return this.handleSubscribe(this.taskService.transferTask(ctx.getState().selectedTask.taskId, action.workbasketId).pipe(take(1),
      tap(selectedTask => ctx.patchState({selectedTask}))));
  }

  handleSubscribe<T>(handle: Observable<T>): Observable<T> {
    handle.pipe(take(1)).pipe(take(1)).subscribe({
      error: error => alert(error.message)
    });
    return handle;
  }
}
