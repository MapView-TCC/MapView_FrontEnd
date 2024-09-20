import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowDynamicComponent } from './dropdow-dynamic.component';

describe('DropdowDynamicComponent', () => {
  let component: DropdowDynamicComponent;
  let fixture: ComponentFixture<DropdowDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdowDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdowDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
