import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../../services/general/general.service';
import { Equipment } from '../../../models/Equipment'; 

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule,MatIconModule, TranslateModule],
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {
  @Input() itemToDelete: Equipment | null = null; // Recebe o item a ser excluído
  @Input() onConfirm: (() => void) | undefined; // Função a ser chamada na confirmação

  constructor(public generalService: GeneralService) {}

  ngOnInit(): void {}

  confirmDelete() {
    if (this.onConfirm) {
      this.onConfirm(); // Chama a função de confirmação
    }
    this.generalService.showDialog = false; // Fecha o popup
  }

  cancelDelete() {
    this.generalService.showDialog = false; // Fecha o popup sem excluir
  }
}
