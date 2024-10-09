import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraduzirComponent } from './traduzir.component';

describe('TraduzirComponent', () => {
  let component: TraduzirComponent;
  let fixture: ComponentFixture<TraduzirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraduzirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraduzirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
