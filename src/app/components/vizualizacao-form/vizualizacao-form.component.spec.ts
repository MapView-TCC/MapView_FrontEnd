import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizacaoFormComponent } from './vizualizacao-form.component';

describe('VizualizacaoFormComponent', () => {
  let component: VizualizacaoFormComponent;
  let fixture: ComponentFixture<VizualizacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizacaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VizualizacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
