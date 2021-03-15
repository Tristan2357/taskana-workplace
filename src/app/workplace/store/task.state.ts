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
@State<TaskStateModel>({name: 'task', defaults: {creating: false, selectedTask: null, tasks: []}})
export class TaskState {

  constructor(private taskService: TaskService) {
  }

  @Action(GetTasks)
  getTasks(ctx: StateContext<TaskStateModel>, action: GetTasks): Observable<Task[]> {
    const obs = this.taskService.getTasks(action.filter).pipe(take(1),
      map(taskResource => (taskResource.tasks as Task[])),
      tap(tasks => ctx.patchState({tasks})));
    obs.pipe(take(1)).subscribe();
    return obs;
  }

  @Action(SelectTask)
  selectTask(ctx: StateContext<TaskStateModel>, action: SelectTask): Observable<Task> {
    const obs = this.taskService.getTaskById(action.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({
          selectedTask, creating: false, tasks: ctx.getState().tasks.map(task => {
            return task.taskId === selectedTask.taskId ? selectedTask : task;
          })
        })
      ));
    obs.pipe(take(1)).subscribe();
    return obs;
  }

  @Action(CompleteTask)
  completeTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    const obs = this.taskService.completeTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({
        selectedTask, tasks: ctx.getState().tasks.map(task => {
          return task.taskId === selectedTask.taskId ? selectedTask : task;
        })
      })));
    obs.pipe(take(1)).subscribe();
    return obs;
  }

  @Action(SaveTask)
  saveTask(ctx: StateContext<TaskStateModel>, action: SaveTask): Observable<any> {
    if (ctx.getState().creating) {
      const obs = this.taskService.createTask(action.task).pipe(take(1),
        tap(selectedTask => ctx.patchState({
          selectedTask,
          creating: false,
          tasks: [...ctx.getState().tasks, selectedTask]
        })));
      obs.pipe(take(1)).subscribe();
      return obs;
    } else {
      const obs = this.taskService.updateTask(action.task).pipe(take(1),
        tap(selectedTask => ctx.patchState({
          selectedTask, creating: false, tasks: ctx.getState().tasks.map(task => {
            return task.taskId === selectedTask.taskId ? selectedTask : task;
          })
        })));
      obs.pipe(take(1)).subscribe();
      return obs;
    }
  }

  @Action(SetCreateTask)
  createTask(ctx: StateContext<TaskStateModel>): Observable<void> {
    ctx.patchState({selectedTask: new Task(), creating: true});
    return of();
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    const state = ctx.getState();
    const obs = this.taskService.deleteTask(state.selectedTask.taskId).pipe(take(1),
      tap(() => ctx.patchState({
        selectedTask: null,
        tasks: state.tasks.filter(task => task.taskId !== state.selectedTask.taskId)
      })));
    obs.pipe(take(1)).subscribe();
    return obs;
  }

  @Action(ClaimTask)
  claimTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    const obs = this.taskService.claimTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({
        selectedTask, tasks: ctx.getState().tasks.map(task => {
          return task.taskId === selectedTask.taskId ? selectedTask : task;
        })
      })));
    obs.pipe(take(1)).subscribe();
    return obs;
  }

  @Action(CancelClaim)
  cancelClaim(ctx: StateContext<TaskStateModel>): Observable<any> {
    const obs = this.taskService.cancelClaimTask(ctx.getState().selectedTask.taskId).pipe(take(1),
      tap(selectedTask => ctx.patchState({
        selectedTask, tasks: ctx.getState().tasks.map(task => {
          return task.taskId === selectedTask.taskId ? selectedTask : task;
        })
      })));
    obs.pipe(take(1)).subscribe();
    return obs;
  }

  @Action(TransferTask)
  transferTask(ctx: StateContext<TaskStateModel>, action: TransferTask): Observable<any> {
    const obs = this.taskService.transferTask(ctx.getState().selectedTask.taskId, action.workbasketId).pipe(take(1),
      tap(selectedTask => ctx.patchState({
        selectedTask, tasks: ctx.getState().tasks.map(task => {
          return task.taskId === selectedTask.taskId ? selectedTask : task;
        })
      })));
    obs.pipe(take(1)).subscribe();
    return obs;
  }
}
