import Filter from '../models/filter';
import { Task } from '../models/task';

export class GetTasks {
  static readonly type = '[Task] Get a list of Tasks, that can be filtered';

  constructor(public filter?: Filter) {
  }
}

export class SelectTask {
  static readonly type = '[Task] Select the Task with the given taskId';

  constructor(public taskId: string) {
  }
}

export class CompleteTask {
  static readonly type = '[Task] Mark the selected Task as completed';
}

export class SaveTask {
  static readonly type = '[Task] Save the selected Task';

  constructor(public task: Task) {
  }
}

export class SetCreateTask {
  static readonly type = '[Task] Create a new Task';
}

export class DeleteTask {
  static readonly type = '[Task] Delete the selected Task';
}

export class ClaimTask {
  static readonly type = '[Task] Claim the selected Task';
}

export class CancelClaim {
  static readonly type = '[Task] Cancel the claim on the selected Task';
}

export class TransferTask {
  static readonly type = '[Task] Transfer the selected Task to another Workbasket';

  constructor(public workbasketId: string) {
  }
}

