import { Component, OnInit } from '@angular/core';
import { importCustomComponents } from '../../util/workplace-lib-importer';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit {

  ngOnInit(): void {
    importCustomComponents();
  }

}
