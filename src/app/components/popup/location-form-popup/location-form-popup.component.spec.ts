import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormPopupComponent } from './location-form-popup.component';

describe('LocationFormPopupComponent', () => {
  let component: LocationFormPopupComponent;
  let fixture: ComponentFixture<LocationFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
