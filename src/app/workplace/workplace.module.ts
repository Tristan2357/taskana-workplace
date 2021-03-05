import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkplaceRoutingModule } from './workplace-routing.module';
import { TaskMainComponent } from './components/task-main/task-main.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { TaskOpenComponent } from './components/task-open/task-open.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { TaskState } from './store/task.state';
import { environment } from '../../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientInterceptorService } from './services/http-client-interceptor.service';


@NgModule({
  declarations: [TaskMainComponent, TaskPreviewComponent, TaskOpenComponent],
  imports: [CommonModule, WorkplaceRoutingModule, HttpClientModule, NgxsModule.forFeature([TaskState])],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpClientInterceptorService,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkplaceModule {
}
