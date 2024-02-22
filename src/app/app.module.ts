import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
  MsalService,
  MsalGuard,
  MsalRedirectComponent,
  MsalModule,
  MsalInterceptor,
} from '@azure/msal-angular';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AnagraficaRisorseInsertComponent } from './component/anagrafica-risorse/anagrafica-risorse-insert/anagrafica-risorse-insert.component';
import { AnagraficaRisorseComponent } from './component/anagrafica-risorse/anagrafica-risorse.component';
import { MonthDialogComponent } from './component/anagrafica-risorse/resource-balances/month-dialog/month-dialog.component';
import { ResourceBalancesComponent } from './component/anagrafica-risorse/resource-balances/resource-balances.component';
import { BatchRegistryComponent } from './component/batch-registry/batch-registry.component';
import { DashboardBatchRegistryComponent } from './component/batch-registry/dashboard-batch-registry/dashboard-batch-registry.component';
import { InserimentoComponent } from './component/batch-registry/inserimento/inserimento.component';
import { CustomerDropdownComponent } from './component/customer-dropdown/customer-dropdown.component';
import { CustomerInsertComponent } from './component/customer/customer-insert/customer-insert.component';
import { CustomerComponent } from './component/customer/customer.component';
import { DashboardForecastComponent } from './component/forecast/dashboard-forecast/dashboard-forecast.component';
import { ForecastGenerateComponent } from './component/forecast/forecast-generate/forecast-generate.component';
import { ForecastComponent } from './component/forecast/forecast.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PrifileComponent } from './component/prifile/prifile.component';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';

const GRAPH_ENDPOINT = 'Enter_the_Graph_Endpoint_Herev1.0/me';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: "b8ac818b-a3d2-4d6f-b0ee-6c483dccc346",
      authority: "https://login.microsoftonline.com/028226e0-99ea-4fab-9d1b-daa440c9e286",
      redirectUri: "/auth/sso",
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
      redirectUri:"/auth/sso",
    },
  };
}
@NgModule({
  declarations: [
    AppComponent, HomeComponent, AnagraficaRisorseComponent,
    BatchRegistryComponent,
    AnagraficaRisorseInsertComponent,
    CustomerDropdownComponent,
    InserimentoComponent,
    CustomerComponent,
    CustomerInsertComponent,
    ForecastComponent,
    ForecastGenerateComponent,
    HomeComponent,
    DashboardForecastComponent,
    DashboardBatchRegistryComponent,
    SpinnerComponent,
    LoginComponent,
    ResourceBalancesComponent,
    MonthDialogComponent,
    PrifileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MsalModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,

  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule { }
