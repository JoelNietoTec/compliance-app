import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import localeEs from '@angular/common/locales/es-MX';

registerLocaleData(localeEs);

// Packages Dependencies
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { ToastOption } from './shared/services/toast-options';
import { CustomDatepickerI18n, I18n } from './shared/services/datepicker-i18n';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsModule } from 'ng2-breadcrumbs';

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
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    ChartsModule,
    CalendarModule.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    BreadcrumbsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: ToastOptions,
      useClass: ToastOption
    },
    I18n,
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
