import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AnagraficaRisorseComponent } from './component/anagrafica-risorse/anagrafica-risorse.component';
import { HttpClientModule } from '@angular/common/http';
import { BatchRegistryComponent } from './component/batch-registry/batch-registry.component';
import { AnagraficaRisorseInsertComponent } from './component/anagrafica-risorse/anagrafica-risorse-insert/anagrafica-risorse-insert.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDropdownComponent } from './component/customer-dropdown/customer-dropdown.component';
import { InserimentoComponent } from './component/batch-registry/inserimento/inserimento.component';
import { FormControl } from '@angular/forms';
import { CustomerServiceComponent } from './component/customer-service/customer-service.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerInsertComponent } from './component/customer/customer-insert/customer-insert.component';
import { CustomerServiceInsertComponent } from './component/customer-service/customer-service-insert/customer-service-insert.component';
import { ForecastComponent } from './component/forecast/forecast.component';
import { ForecastGenerateComponent } from './component/forecast/forecast-generate/forecast-generate.component';
@NgModule({
  declarations: [
    AppComponent,

    AnagraficaRisorseComponent,
     BatchRegistryComponent,
     AnagraficaRisorseInsertComponent,
     CustomerDropdownComponent,
     InserimentoComponent,
     CustomerServiceComponent,
     CustomerComponent,
     CustomerInsertComponent,
     CustomerServiceInsertComponent,
     ForecastComponent,
     ForecastGenerateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
