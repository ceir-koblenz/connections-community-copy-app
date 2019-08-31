import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityComponent } from './components/community/community.component';

const routes: Routes = [
  { path: 'community-selection/:id', component: CommunityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
