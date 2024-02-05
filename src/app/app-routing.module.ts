import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaRisorseComponent } from './component/anagrafica-risorse/anagrafica-risorse.component';
import { BatchRegistryComponent } from './component/batch-registry/batch-registry.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerServiceComponent } from './component/customer-service/customer-service.component';
import { ForecastGenerateComponent } from './component/forecast/forecast-generate/forecast-generate.component';
import { ForecastComponent } from './component/forecast/forecast.component';

const routes: Routes = [
  
  
  { path: 'anagrafica-risorsa', component: AnagraficaRisorseComponent },
  { path: 'anagrafica-lotti', component: BatchRegistryComponent },
  { path: 'customer-service', component: CustomerServiceComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'forecast/generate', component: ForecastGenerateComponent },
  { path: 'forecast', component: ForecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
