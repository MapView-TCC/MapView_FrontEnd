import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CadastroFormComponent } from "../../components/cadastro-form/cadastro-form.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-cadastro-page',
  standalone: true,
  imports: [HeaderComponent, CadastroFormComponent, FooterComponent],
  templateUrl: './cadastro-page.component.html',
  styleUrl: './cadastro-page.component.scss'
})
export class CadastroPageComponent {

}
