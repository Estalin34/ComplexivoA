import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),  provideHttpClient(),
  provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"taller-e5641","appId":"1:609099001095:web:41f471b57c3f925206a9a2","storageBucket":"taller-e5641.firebasestorage.app","apiKey":"AIzaSyB22iy8xf-htWmun3iGAau4oHFtiGdWFCQ","authDomain":"taller-e5641.firebaseapp.com","messagingSenderId":"609099001095"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), 
  ]
};
