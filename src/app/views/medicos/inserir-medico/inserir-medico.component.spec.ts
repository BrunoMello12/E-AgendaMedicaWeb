import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirMedicoComponent } from './inserir-medico.component';

describe('InserirMedicoComponent', () => {
  let component: InserirMedicoComponent;
  let fixture: ComponentFixture<InserirMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserirMedicoComponent]
    });
    fixture = TestBed.createComponent(InserirMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
