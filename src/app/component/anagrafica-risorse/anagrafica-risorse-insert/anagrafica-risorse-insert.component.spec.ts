import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagraficaRisorseInsertComponent } from './anagrafica-risorse-insert.component';

describe('AnagraficaRisorseInsertComponent', () => {
  let component: AnagraficaRisorseInsertComponent;
  let fixture: ComponentFixture<AnagraficaRisorseInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnagraficaRisorseInsertComponent]
    });
    fixture = TestBed.createComponent(AnagraficaRisorseInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
