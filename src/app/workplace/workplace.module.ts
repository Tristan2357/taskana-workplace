import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkplaceRoutingModule } from './workplace-routing.module';
import { TaskMainComponent } from './components/task-main/task-main.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { TaskOpenComponent } from './components/task-open/task-open.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { TaskState } from './store/task.state';
import { environment } from '../../environments/environment';
import { TaskService } from './services/task.service';


@NgModule({
  declarations: [TaskMainComponent, TaskPreviewComponent, TaskOpenComponent],
  imports: [CommonModule, WorkplaceRoutingModule, HttpClientModule,
    NgxsModule.forRoot([TaskState], {developmentMode: !environment.production})],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkplaceModule {
}
