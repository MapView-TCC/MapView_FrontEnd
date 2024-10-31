import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponet } from './register.component';

describe('RegisterComponet', () => {
  let component: RegisterComponet;
  let fixture: ComponentFixture<RegisterComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponet]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
