import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskMainComponent } from './components/task-main/task-main.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { TaskOpenComponent } from './components/task-open/task-open.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskMainComponent,
    children: [
      {
        path: 'taskdetail/:id',
        component: TaskPreviewComponent,
      },
      {
        path: 'task/:id',
        component: TaskOpenComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkplaceRoutingModule { }
