import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from 'taskana-workplace-lib';


@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.css']
})
export class TaskMasterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    defineCustomElements();
  }

}
