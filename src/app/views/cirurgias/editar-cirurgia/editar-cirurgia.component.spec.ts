import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCirurgiaComponent } from './editar-cirurgia.component';

describe('EditarCirurgiaComponent', () => {
  let component: EditarCirurgiaComponent;
  let fixture: ComponentFixture<EditarCirurgiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCirurgiaComponent]
    });
    fixture = TestBed.createComponent(EditarCirurgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
