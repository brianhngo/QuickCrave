import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-driver-license',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-driver-license.component.html',
  styleUrl: './add-driver-license.component.css',
})
export class AddDriverLicenseComponent {
  @Input() isDriverLicenseModal: boolean = false;
  @Output() closed = new EventEmitter<void>();

  closeAddDriverLicenseModal() {
    this.isDriverLicenseModal = false;
    this.closed.emit();
  }
}
