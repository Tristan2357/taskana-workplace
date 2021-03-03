import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../util/workplace-lib-importer';

@Component({
  selector: 'app-task-open',
  templateUrl: './task-open.component.html',
  styleUrls: ['./task-open.component.css']
})
export class TaskOpenComponent implements OnInit {

  ngOnInit(): void {
    importCustomComponents();
  }

}
