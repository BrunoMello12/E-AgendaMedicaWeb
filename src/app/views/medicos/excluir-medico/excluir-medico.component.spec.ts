import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirMedicoComponent } from './excluir-medico.component';

describe('ExcluirMedicoComponent', () => {
  let component: ExcluirMedicoComponent;
  let fixture: ComponentFixture<ExcluirMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcluirMedicoComponent]
    });
    fixture = TestBed.createComponent(ExcluirMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
