import { Component, TemplateRef } from '@angular/core';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [ItemModalComponent],
  providers: [ModalService],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent {
  constructor(private modalService: ModalService) {}
  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Foo' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }
}
