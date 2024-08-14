import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IventarioComponent } from './iventario.component';

describe('IventarioComponent', () => {
  let component: IventarioComponent;
  let fixture: ComponentFixture<IventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
