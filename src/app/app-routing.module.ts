import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityComponent } from './components/community/community.component';
import { ServiceDocumentComponent } from './components/service-document/service-document.component';

const routes: Routes = [
  { path: '', redirectTo: '/service', pathMatch: 'full' },
  { path: 'community-selection/:id', component: CommunityComponent},
  { path: 'service', component: ServiceDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
