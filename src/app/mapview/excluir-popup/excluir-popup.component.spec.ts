import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirPopupComponent } from './excluir-popup.component';

describe('ExcluirPopupComponent', () => {
  let component: ExcluirPopupComponent;
  let fixture: ComponentFixture<ExcluirPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluirPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
