import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaRisorseComponent } from './component/anagrafica-risorse/anagrafica-risorse.component';
import { BatchRegistryComponent } from './component/batch-registry/batch-registry.component';
import { CustomerComponent } from './component/customer/customer.component';
import { ForecastGenerateComponent } from './component/forecast/forecast-generate/forecast-generate.component';
import { ForecastComponent } from './component/forecast/forecast.component';
import { HomeComponent } from './component/home/home.component';
import { ResourceBalancesComponent } from './component/anagrafica-risorse/resource-balances/resource-balances.component';
import { MsalGuard } from "@azure/msal-angular";
import { BrowserUtils } from '@azure/msal-browser';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  
  
  { path: 'anagrafica-risorsa', component: AnagraficaRisorseComponent, canActivate:[MsalGuard]},
  { path: 'anagrafica-risorsa/balances', component: ResourceBalancesComponent, canActivate:[MsalGuard]},
  { path: 'anagrafica-lotti', component: BatchRegistryComponent , canActivate:[MsalGuard]},
  { path: 'customer', component: CustomerComponent , canActivate:[MsalGuard]},
  { path: 'forecast/generate', component: ForecastGenerateComponent , canActivate:[MsalGuard]},
  { path: 'forecast', component: ForecastComponent , canActivate:[MsalGuard]},
  { path: 'home', component: HomeComponent , canActivate:[MsalGuard]},
  { path: '', component: HomeComponent , canActivate:[MsalGuard]},
  { path: 'auth/sso', component: LoginComponent , canActivate:[MsalGuard]},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
