import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getAuth } from 'firebase/auth';
import { storage } from '../../firebase.config'; // Assuming you have the storage object exported from your firebase config
import { ref, getDownloadURL, listAll } from 'firebase/storage';

@Component({
  selector: 'app-view-driver-license-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-driver-license-info.component.html',
  styleUrls: ['./view-driver-license-info.component.css'],
})
export class ViewDriverLicenseInfoComponent implements OnInit {
  @Input() driverLicenseInfo: any;
  @Input() isViewDriverLicenseInfo = false;
  @Output() closed = new EventEmitter<void>();

  driverLicenseFrontFirebase: string = '';
  driverLicenseBackFirebase: string = '';

  closeModal() {
    this.isViewDriverLicenseInfo = false;
    this.closed.emit();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  getUsersImagesFromFirebase() {
    const auth = getAuth();
    const userId = auth?.currentUser?.uid;

    if (userId) {
      const frontFolder = `${userId}/front`;
      const backFolder = `${userId}/back`;

      this.getFirstImageUrl(frontFolder).subscribe({
        next: (url) => {
          this.driverLicenseFrontFirebase = url;
        },
        error: (err) => {
          console.error('Error fetching front image URL:', err);
        },
      });

      this.getFirstImageUrl(backFolder).subscribe({
        next: (url) => {
          this.driverLicenseBackFirebase = url;
        },
        error: (err) => {
          console.error('Error fetching back image URL:', err);
        },
      });
    } else {
      console.error('User ID not found');
    }
  }

  getFirstImageUrl(folderPath: string): Observable<string> {
    const folderRef = ref(storage, folderPath);
    return from(listAll(folderRef)).pipe(
      switchMap((result) => {
        if (result.items.length > 0) {
          const fileRef = result.items[0];
          return from(getDownloadURL(fileRef));
        } else {
          throw new Error('No files found in folder');
        }
      })
    );
  }

  ngOnInit() {
    this.getUsersImagesFromFirebase();
  }
}
