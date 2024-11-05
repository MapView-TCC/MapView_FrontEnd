import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpStaticComponent } from './drp-static.component';

describe('DrpStaticComponent', () => {
  let component: DrpStaticComponent;
  let fixture: ComponentFixture<DrpStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrpStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrpStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
