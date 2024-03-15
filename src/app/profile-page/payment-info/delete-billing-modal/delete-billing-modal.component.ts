import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { supabase } from '../../../../../supabase.config';
import { auth } from '../../../firebase.config';

@Component({
  selector: 'app-delete-billing-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-billing-modal.component.html',
  styleUrl: './delete-billing-modal.component.css',
})
export class DeleteBillingModalComponent {
  @Input() isDeleteModal = false;
  @Input() getUserBillingList!: () => void;
  @Input() deleteId: string = '';
  @Output() closed = new EventEmitter<void>();

  closeDeleteModal() {
    this.isDeleteModal = false;
    this.closed.emit();
  }

  deleteCreditCard = async () => {
    try {
      await supabase
        .from('billing')
        .delete()

        .eq('id', this.deleteId.toString())
        .then(() => {
          this.getUserBillingList();
          this.closeDeleteModal();
        });
    } catch (error) {
      console.error(error);
    }
  };
}
