import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateCardComponent } from './translate-card.component';

describe('TranslateCardComponent', () => {
  let component: TranslateCardComponent;
  let fixture: ComponentFixture<TranslateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
