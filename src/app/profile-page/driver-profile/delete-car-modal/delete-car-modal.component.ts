import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { supabase } from '../../../../../supabase.config';
import { auth } from '../../../firebase.config';

@Component({
  selector: 'app-delete-car-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-car-modal.component.html',
  styleUrl: './delete-car-modal.component.css',
})
export class DeleteCarModalComponent {
  @Input() deleteId: string = '';
  @Input() getCarList!: () => void;
  @Input() isDeleteCarModal = false;
  @Output() closed = new EventEmitter<void>();

  closeDeleteModal() {
    this.isDeleteCarModal = false;
    this.closed.emit();
  }

  async deleteCar() {
    try {
      console.log(this.deleteId);
      await supabase
        .from('driver')
        .delete()
        .eq('carId', this.deleteId)
        .eq('firebaseId', auth.currentUser?.uid)
        .then(() => {
          this.getCarList();
          this.closeDeleteModal();
        });
    } catch (error) {
      console.log(error);
    }
  }
}
