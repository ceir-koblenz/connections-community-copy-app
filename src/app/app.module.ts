import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ServiceDocumentComponent } from './components/service-document/service-document.component';
import { DevHttpInterceptor } from './dev-http-interceptor';
import { CommunityCollectionComponent } from './components/community-collection/community-collection.component';
import { LoggingComponent } from './components/logging/logging.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceDocumentComponent,
    CommunityCollectionComponent,
    LoggingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
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
