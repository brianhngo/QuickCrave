import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-driver-license-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-driver-license-info.component.html',
  styleUrl: './view-driver-license-info.component.css',
})
export class ViewDriverLicenseInfoComponent {
  @Input() isViewDriverLicenseInfo = false;
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.isViewDriverLicenseInfo = false;
    this.closed.emit();
  }
}
