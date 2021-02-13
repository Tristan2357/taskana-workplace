import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskMasterComponent } from './task-master/task-master.component';

const routes: Routes = [
  {
    path: '',
    component: TaskMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkplaceRoutingModule { }
