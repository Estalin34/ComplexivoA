import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient, withFetch } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),  provideHttpClient(),

  provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId": "app-ia-12924",
  "appId": "1:93655632944:web:81cc1333ff8184a2ba71f5",
  "storageBucket": "app-ia-12924.firebasestorage.app",
  "apiKey": "AIzaSyBEvmHlV85Faj720VHjvC-0f5CYqXm_sNc",
  "authDomain": "app-ia-12924.firebaseapp.com",
  "messagingSenderId": "93655632944"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), 
  ]
};
