import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HistoryComponent,
        MatCommonModule,
        MatButtonModule,
        MatMenuModule,
        CommonModule,
        MatIconModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
