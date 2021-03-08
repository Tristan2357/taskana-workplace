import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../../util/workplace-lib-importer';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../models/task';
import { TaskSelectors } from '../../store/task.selectors';
import { GetTasks, SelectTask, SetCreateTask } from '../../store/task.actions';
import Filter from '../../models/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkbasketService } from '../../services/workbasket.service';
import { Workbasket } from '../../models/workbasket';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css']
})
export class TaskMainComponent implements OnInit {

  @Select(TaskSelectors.tasks) tasks$: Observable<Task[]>;
  @Select(TaskSelectors.selectedTask) selectedTask$: Observable<Task>;

  workbaskets: Workbasket[];

  destroy$ = new Subject<void>();

  constructor(private store: Store,
              private router: Router,
              private activeRoute: ActivatedRoute,
              public workbasketService: WorkbasketService) {
  }

  async ngOnInit(): Promise<void> {
    importCustomComponents();
    this.store.dispatch(new GetTasks());
    if (this.activeRoute.firstChild) {
      const childRoute = this.activeRoute.firstChild.snapshot;
      this.store.dispatch(new SelectTask(childRoute.params.id)).pipe(take(1)).subscribe({
        next: task => {
          if (!task || typeof task === 'undefined') {
            console.log('well its treason then');
            this.navigateToMain();
          }
        }, error: () => this.navigateToMain()
      });
    }
    this.workbaskets = await this.workbasketService.getWorkbaskets();
  }

  private navigateToMain(): void {
    this.router.navigate(['./'], {relativeTo: this.activeRoute});
  }

  handleSelectChange(event: CustomEvent<string>): void {
    this.store.dispatch(new SelectTask(event.detail));
    this.router.navigate([`./taskdetail/${event.detail}`], {relativeTo: this.activeRoute});
  }

  handleSearch(event: CustomEvent<Filter>): void {
    this.store.dispatch(new GetTasks(event.detail));
  }

  handleAddTask(): void {
    this.store.dispatch(new SetCreateTask());
    this.router.navigate([`./taskdetail/new`], {relativeTo: this.activeRoute});
  }
}
