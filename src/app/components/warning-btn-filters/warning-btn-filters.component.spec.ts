import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningBtnFiltersComponent } from './warning-btn-filters.component';

describe('WarningBtnFiltersComponent', () => {
  let component: WarningBtnFiltersComponent;
  let fixture: ComponentFixture<WarningBtnFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningBtnFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarningBtnFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
