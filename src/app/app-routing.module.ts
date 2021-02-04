import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'workplace',
    loadChildren: () =>
      import('./workplace/workplace.module').then((m) => m.WorkplaceModule)
  },
  {
    path: '**', redirectTo: 'workplace'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
