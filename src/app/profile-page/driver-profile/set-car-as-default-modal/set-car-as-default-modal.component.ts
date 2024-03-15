import { Component, Input, Output, EventEmitter } from '@angular/core';
import { supabase } from '../../../../../supabase.config';
import { auth } from '../../../firebase.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-car-as-default-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './set-car-as-default-modal.component.html',
  styleUrl: './set-car-as-default-modal.component.css',
})
export class SetCarAsDefaultModalComponent {
  @Input() defaultId = '';
  @Input() getCarList!: () => void;
  @Input() isDefaultCarModal: boolean = false;
  @Output() closed = new EventEmitter<void>();

  closeDefaultModal() {
    this.closed.emit();
    this.isDefaultCarModal = false;
  }

  async setDefaultCarModal() {
    try {
      await supabase
        .from('driver')
        .update({ isDefault: false })
        .eq('firebaseId', auth.currentUser?.uid);

      await supabase
        .from('driver')
        .update({ isDefault: true })
        .eq('firebaseId', auth.currentUser?.uid)
        .eq('carId', this.defaultId.toString())
        .then(() => {
          this.getCarList();
          this.closeDefaultModal();
        });
    } catch (error) {
      console.error(error);
    }
  }
}
