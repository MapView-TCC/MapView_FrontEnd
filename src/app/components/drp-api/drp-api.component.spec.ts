import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpApiComponent } from './drp-api.component';

describe('DrpApiComponent', () => {
  let component: DrpApiComponent;
  let fixture: ComponentFixture<DrpApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrpApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrpApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
