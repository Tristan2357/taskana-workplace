import { Action, NgxsAfterBootstrap, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';
import {
  CancelClaim,
  ClaimTask,
  CompleteTask,
  CreateTask,
  DeleteTask,
  GetAllTasks,
  GetTasksWithFilter,
  SaveTask,
  SelectTask,
  TransferTask
} from './task.actions';
import { TaskService } from '../services/task.service';
import { take } from 'rxjs/operators';

export interface TaskStateModel {
  selectedTask: Task;
  tasks: Task[];
}

class InitializeStore {
  static readonly type = '[Task] Initializing state';
}

@Injectable()
@State<TaskStateModel>({name: 'task'})
export class TaskState implements NgxsAfterBootstrap {

  constructor(private taskService: TaskService) {
  }

  @Action(InitializeStore)
  initializeStore(ctx: StateContext<TaskStateModel>): Observable<any> {
    this.taskService.getTasks({'sort-by': 'PRIORITY', order: 'DESCENDING'})
      .pipe(take(1)).subscribe(r => console.log(r));
    return of(null);
  }

  // TODO merge with filter
  @Action(GetAllTasks)
  getAllTasks(ctx: StateContext<TaskStateModel>): Observable<any> {
    this.taskService.getTasks();
    return of(null);
  }

  @Action(GetTasksWithFilter)
  getTasksWithFilter(ctx: StateContext<TaskStateModel>, action: GetTasksWithFilter): Observable<any> {
    this.taskService.getTasks(action?.filter);
    return of(null);
  }

  @Action(SelectTask)
  selectTask(ctx: StateContext<TaskStateModel>, action: SelectTask): Observable<any> {
    this.taskService.getTaskById(action.taskId);
    return of(null);
  }

  @Action(CompleteTask)
  completeTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    /*TODO state.selectedTask.taskId or in service subscribe to selectedTask*/
    this.taskService.completeTask('');
    return of(null);
  }

  @Action(SaveTask)
  saveTask(ctx: StateContext<TaskStateModel>, action: SaveTask): Observable<any> {
    this.taskService.updateTask(action.task);
    return of(null);
  }

  @Action(CreateTask)
  createTask(ctx: StateContext<TaskStateModel>, action: CreateTask): Observable<any> {
    this.taskService.createTask(action.task);
    return of(null);
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>, action: DeleteTask): Observable<any> {
    /*TODO state.selectedTask.taskId or in service subscribe to selectedTask*/
    this.taskService.deleteTask('');
    return of(null);
  }

  @Action(ClaimTask)
  claimTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    return of(null);
  }

  @Action(CancelClaim)
  cancelClaim(ctx: StateContext<TaskStateModel>): Observable<any> {
    return of(null);
  }

  @Action(TransferTask)
  transferTask(ctx: StateContext<TaskStateModel>): Observable<any> {
    return of(null);
  }


  ngxsAfterBootstrap(ctx?: StateContext<any>): void {
    ctx.dispatch(new InitializeStore());
  }

}
