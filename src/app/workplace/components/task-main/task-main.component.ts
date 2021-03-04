import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../../util/workplace-lib-importer';
import { Store } from '@ngxs/store';
import { GetAllTasks, GetTasksWithFilter } from '../../store/task.actions';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css']
})
export class TaskMainComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    importCustomComponents();
  }
}
