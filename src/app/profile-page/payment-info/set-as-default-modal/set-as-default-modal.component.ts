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
  selector: 'app-set-as-default-modal',
  standalone: true,
  imports: [],
  templateUrl: './set-as-default-modal.component.html',
  styleUrl: './set-as-default-modal.component.css',
})
export class SetAsDefaultModalComponent {
  @Input() isSetDefaultModal = false;
  @Input() getUserBillingList!: () => void;
  @Input() SetDefaultId: string = '';
  @Output() closed = new EventEmitter<void>();

  closeDefaultModal() {
    this.isSetDefaultModal = false;
    this.closed.emit();
  }

  setDefaultCreditCard = async () => {
    try {
      // set original true one to false
      await supabase
        .from('billing')
        .update({ isDefault: false })
        .eq('firebaseId', auth.currentUser?.uid)
        .eq('isDefault', true);
      // set the new default to true
      await supabase
        .from('billing')
        .update({
          isDefault: true,
        })
        .eq('firebaseId', auth.currentUser?.uid)
        .eq('id', this.SetDefaultId.toString())
        .then(() => {
          this.getUserBillingList();
          this.closeDefaultModal();
        });
    } catch (error) {
      console.error(error);
    }
  };
}
