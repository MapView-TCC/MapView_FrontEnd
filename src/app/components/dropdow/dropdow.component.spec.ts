import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowComponent } from './dropdow.component';

describe('DropdowComponent', () => {
  let component: DropdowComponent;
  let fixture: ComponentFixture<DropdowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
