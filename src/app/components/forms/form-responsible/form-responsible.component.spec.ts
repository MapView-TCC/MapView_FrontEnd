import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponsibleComponent } from './form-responsible.component';

describe('FormResponsibleComponent', () => {
  let component: FormResponsibleComponent;
  let fixture: ComponentFixture<FormResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormResponsibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
