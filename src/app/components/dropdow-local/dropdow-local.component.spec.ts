import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowLocalComponent } from './dropdow-local.component';

describe('DropdowLocalComponent', () => {
  let component: DropdowLocalComponent;
  let fixture: ComponentFixture<DropdowLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdowLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdowLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
