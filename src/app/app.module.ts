import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientInterceptorService } from './workplace/services/http-client-interceptor.service';


@NgModule({
  declarations: [AppComponent],
  imports: [NgxsModule.forRoot([], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    AppRoutingModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
