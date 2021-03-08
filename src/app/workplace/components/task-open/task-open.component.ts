import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../../util/workplace-lib-importer';
import { Select, Store } from '@ngxs/store';
import { TaskSelectors } from '../../store/task.selectors';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { CancelClaim, CompleteTask, TransferTask } from '../../store/task.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkbasketService } from '../../services/workbasket.service';
import { Workbasket } from '../../models/workbasket';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-open',
  templateUrl: './task-open.component.html',
  styleUrls: ['./task-open.component.css']
})
export class TaskOpenComponent implements OnInit {

  @Select(TaskSelectors.selectedTask) selectedTask$: Observable<Task>;
  workbaskets: Workbasket[];

  constructor(private store: Store,
              private router: Router,
              private activeRoute: ActivatedRoute,
              public workbasketService: WorkbasketService) {
  }

  async ngOnInit(): Promise<void> {
    importCustomComponents();
    this.workbaskets = await this.workbasketService.getWorkbaskets();
  }

  handleTransferTask(event: CustomEvent<string>): void {
    this.store.dispatch(new TransferTask(event.detail));
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
