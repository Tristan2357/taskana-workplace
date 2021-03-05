import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../../util/workplace-lib-importer';
import { Select, Store } from '@ngxs/store';
import { TaskSelectors } from '../../store/task.selectors';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../models/task';
import { CancelClaim, CompleteTask, TransferTask } from '../../store/task.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-open',
  templateUrl: './task-open.component.html',
  styleUrls: ['./task-open.component.css']
})
export class TaskOpenComponent implements OnInit {

  @Select(TaskSelectors.selectedTask) selectedTask$: Observable<Task>;

  destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    importCustomComponents();
  }

  handleTransferTask(event: CustomEvent<{ workbasketId: string }>): void {
    this.store.dispatch(new TransferTask(event.detail.workbasketId));
  }

  handleCompleteTask(): void {
    this.store.dispatch(new CompleteTask());
    this.router.navigate([`./`], {relativeTo: this.activeRoute.parent});
  }

  handleBack(): void {
    const id = this.activeRoute.snapshot.url[1];
    this.store.dispatch(new CancelClaim());
    this.router.navigate([`./taskdetail/${id}`], {relativeTo: this.activeRoute.parent});
  }
}
