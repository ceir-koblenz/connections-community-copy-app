import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceDocumentComponent } from './components/service-document/service-document.component';
import { DevHttpInterceptor } from './dev-http-interceptor';
import { CommunityCollectionComponent } from './components/community-collection/community-collection.component';
import { LoggingComponent } from './components/logging/logging.component';
import { CommunityComponent } from './components/community/community.component';
import { LogoComponent } from './components/logo/logo.component';
import { MembersComponent } from './components/members/members.component';
import { RemoteApplicationsComponent } from './components/remote-applications/remote-applications.component';
import { WikiComponent } from './components/remote-applications/wiki/wiki.component';
import { BlogComponent } from './components/remote-applications/blog/blog.component';
import { FilesComponent } from './components/remote-applications/files/files.component';
import { AktivitaetenComponent } from './components/remote-applications/aktivitaeten/aktivitaeten.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { CommunityWrapperComponent } from './components/app/community-wrapper/community-wrapper.component';
import { SubfolderComponent } from './components/remote-applications/files/subfolder/subfolder.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LayoutComponent } from './components/layout/layout.component';
import { FilterPipe } from './pipes/filter.pipe';
import { WikiChildComponent } from './components/remote-applications/wiki/wiki-child/wiki-child.component';
import { ForumComponent } from './components/remote-applications/forum/forum.component';
import { SelectProcessTypeComponent } from './components/app/select-process-type/select-process-type.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ServiceDocumentComponent,
    CommunityCollectionComponent,
    LoggingComponent,
    CommunityComponent,
    LogoComponent,
    MembersComponent,
    RemoteApplicationsComponent,
    WikiComponent,
    BlogComponent,
    FilesComponent,
    AktivitaetenComponent,
    WidgetsComponent,
    CommunityWrapperComponent,
    SubfolderComponent,
    FilterPipe,
    LayoutComponent,
    WikiChildComponent,
    ForumComponent,
    SelectProcessTypeComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    EditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DevHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
