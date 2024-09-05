import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-ambiente',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './ambiente.component.html',
  styleUrl: './ambiente.component.scss'
})
export class AmbienteComponent implements OnInit{

  constructor(private translator: TranslationService){}

  ngOnInit(): void {
    this.translator.getCurrentLanguage();
  }

  
}
