import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../../util/workplace-lib-importer';
import { Select, Store } from '@ngxs/store';
import { TaskSelectors } from '../../store/task.selectors';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../models/task';
import { CancelClaim, ClaimTask, DeleteTask, SaveTask } from '../../store/task.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit {

  @Select(TaskSelectors.selectedTask) selectedTask$: Observable<Task>;

  destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    importCustomComponents();
  }

  handleSave(event: CustomEvent<Task>): void {
    this.store.dispatch(new SaveTask(event.detail));
  }

  handleDelete(): void {
    this.router.navigate([`../../`], {relativeTo: this.activeRoute});
    this.store.dispatch(new DeleteTask());
  }

  handleOpen(): void {
    const id = this.activeRoute.snapshot.url[1];
    this.router.navigate([`./task/${id}`], {relativeTo: this.activeRoute.parent});
    this.store.dispatch(new CancelClaim());
    this.store.dispatch(new ClaimTask());
  }

  handleClose(): void {
    this.router.navigate([`../../`], {relativeTo: this.activeRoute});
  }
}
