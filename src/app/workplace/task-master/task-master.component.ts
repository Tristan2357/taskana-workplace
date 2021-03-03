import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../util/workplace-lib-importer';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.css']
})
export class TaskMasterComponent implements OnInit {

  ngOnInit(): void {
    importCustomComponents();
  }

}
