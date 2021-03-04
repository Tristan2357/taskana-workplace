import { Selector } from '@ngxs/store';
import { Task } from '../models/task';
import { TaskState, TaskStateModel } from './task.state';

export class TaskSelectors {

  @Selector([TaskState])
  static tasks(state: TaskStateModel): Task[] {
    return state.tasks;
  }

  @Selector([TaskState])
  static selectedTask(state: TaskStateModel): Task {
    return state.selectedTask;
  }
}
