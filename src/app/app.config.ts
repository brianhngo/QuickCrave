import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';

// Import the initialized Firebase app and services
import { app, auth, storage } from './firebase.config';
import { getFirestore } from 'firebase/firestore';

// Define the application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom([
      provideFirebaseApp(() => app), // Provide the initialized Firebase app
      provideAuth(() => auth), // Provide the Firebase authentication service
      provideStorage(() => storage), // Provide the Firebase storage service
      // Provide Firestore service
      provideFirestore(() => getFirestore(app)),
    ]),
  ],
};
