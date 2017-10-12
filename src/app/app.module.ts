import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

// Packages Dependencies
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { ToastOption } from './shared/services/toast-options';

// Main Dependencies
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthGuard } from './shared/services/auth.guard';

// Routers
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    ChartsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-PA'
    },
    BreadcrumbService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: ToastOptions,
      useClass: ToastOption
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
