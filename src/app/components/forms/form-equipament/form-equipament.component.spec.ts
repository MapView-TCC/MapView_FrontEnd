import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEquipamentComponent } from './form-equipament.component';

describe('FormEquipamentComponent', () => {
  let component: FormEquipamentComponent;
  let fixture: ComponentFixture<FormEquipamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEquipamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEquipamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
