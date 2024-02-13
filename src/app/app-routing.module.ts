import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaRisorseComponent } from './component/anagrafica-risorse/anagrafica-risorse.component';
import { BatchRegistryComponent } from './component/batch-registry/batch-registry.component';
import { CustomerComponent } from './component/customer/customer.component';
import { ForecastGenerateComponent } from './component/forecast/forecast-generate/forecast-generate.component';
import { ForecastComponent } from './component/forecast/forecast.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  
  
  { path: 'anagrafica-risorsa', component: AnagraficaRisorseComponent, canActivate:[AuthGuard]},
  { path: 'anagrafica-lotti', component: BatchRegistryComponent , canActivate:[AuthGuard]},
  { path: 'customer', component: CustomerComponent , canActivate:[AuthGuard]},
  { path: 'forecast/generate', component: ForecastGenerateComponent , canActivate:[AuthGuard]},
  { path: 'forecast', component: ForecastComponent , canActivate:[AuthGuard]},
  { path: '', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
