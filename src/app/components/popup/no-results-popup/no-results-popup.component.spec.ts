import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultsPopupComponent } from './no-results-popup.component';

describe('NoResultsPopupComponent', () => {
  let component: NoResultsPopupComponent;
  let fixture: ComponentFixture<NoResultsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoResultsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoResultsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
