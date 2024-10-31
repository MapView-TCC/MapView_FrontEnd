//Imports for Angular 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

//Imports for our components
import { TranslateCardComponent } from '../../components/cards/translate-card/translate-card.component';
import { TranslationService } from '../../services/translate/translation.service';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, CommonModule, TranslateModule, TranslateCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  router: any;

  showCard = false;

  toggleCard() {
    this.showCard = !this.showCard;
  }


  onInicial() {
    this.router.navigate(['']);
  }

  constructor(private translator: TranslationService) { }

  ngOnInit(): void {
    this.translator.getCurrentLanguage();
    console.log(this.translator.getCurrentLanguage());
  }

}
