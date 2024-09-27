import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../services/general/general.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdowDynamicComponent } from '../dropdow-dynamic/dropdow-dynamic.component';
import { DropdowLocalComponent } from '../dropdow-local/dropdow-local.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';


@Component({
  selector: 'app-location-popup',
  standalone: true,
  imports: [CommonModule,MatIconModule,DropdowDynamicComponent,DropdowLocalComponent,ErrorMessageComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './location-popup.component.html',
  styleUrl: './location-popup.component.scss'
})
export class LocationPopupComponent implements OnInit{
  
  constructor(private fb: FormBuilder, private buldingDrp: BuildingDrpService, public generalService:GeneralService) {
    // Inicialize o FormGroup com os controles necessários
  }



    //Form Group localização
    cadastroNovoLocalizacao = this.fb.group({
      id_building: [{value: '', disabled: false}, Validators.required],
      id_enviroment: [{value: '', disabled: false}, Validators.required],
      area: new FormControl ('', Validators.required),
      posto: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')])
    });
  

  ngOnInit(): void{

  }



}
