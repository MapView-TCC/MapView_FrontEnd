import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../services/general/general.service';
import { Equipment } from '../../models/Equipment'; // Certifique-se de que está importando Equipment


@Component({
  selector: 'app-excluir-popup',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './excluir-popup.component.html',
  styleUrls: ['./excluir-popup.component.scss']
})
export class ExcluirPopupComponent implements OnInit {
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
