import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralService } from '../../../services/general/general.service';


@Component({
  selector: 'app-drp-static',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, FormsModule],
  templateUrl: './drp-static.component.html',
  styleUrl: './drp-static.component.scss'
})
export class DrpStaticComponent {

  //Para a tradução
  constructor(public generalService: GeneralService) { }

  //Parametros do dropdown
  @Input() id: string = '';
  @Input() options: { value: number | string; label: string }[] = [];
  @Input() selectedValue!: string | null;
  @Input() table: string = '';
  @Input() control!: FormControl;
  @Input() disabled: boolean = false;


    ngOnInit() {
    console.log(this.control);
    console.log(this.control.value);
    this.selectedValue = this.control.value;
  }


}
