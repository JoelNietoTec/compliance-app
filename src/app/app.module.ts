import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Packages Dependencies
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts/ng2-charts';

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
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    DashboardModule,
    AppRoutingModule,
    AuthenticationModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [
    BreadcrumbService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
