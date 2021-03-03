import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkplaceRoutingModule } from './workplace-routing.module';
import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { TaskOpenComponent } from './task-open/task-open.component';


@NgModule({
  declarations: [TaskMasterComponent, TaskPreviewComponent, TaskOpenComponent],
  imports: [CommonModule, WorkplaceRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkplaceModule {
}
