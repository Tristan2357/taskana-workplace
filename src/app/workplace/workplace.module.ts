import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkplaceRoutingModule } from './workplace-routing.module';
import { TaskMasterComponent } from './task-master/task-master.component';


@NgModule({
  declarations: [TaskMasterComponent],
  imports: [CommonModule, WorkplaceRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkplaceModule {
}
