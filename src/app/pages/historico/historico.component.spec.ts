import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoComponent } from './historico.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HistoricoComponent,
        MatCommonModule,
        MatButtonModule,
        MatMenuModule,
        CommonModule,
        MatIconModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
