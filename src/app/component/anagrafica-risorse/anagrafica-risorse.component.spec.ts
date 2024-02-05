import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagraficaRisorseComponent } from './anagrafica-risorse.component';

describe('AnagraficaRisorseComponent', () => {
  let component: AnagraficaRisorseComponent;
  let fixture: ComponentFixture<AnagraficaRisorseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnagraficaRisorseComponent]
    });
    fixture = TestBed.createComponent(AnagraficaRisorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
