// plugins/firebase.client.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: runtimeConfig.public.FIREBASE_API_KEY,
    authDomain: runtimeConfig.public.FIREBASE_AUTH_DOMAIN,
    projectId: runtimeConfig.public.FIREBASE_PROJECT_ID,
    storageBucket: runtimeConfig.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: runtimeConfig.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: runtimeConfig.public.FIREBASE_APP_ID
  }

  // Debug logging - check what values are being used
  console.log('Firebase config (API key partially redacted):', {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 5)}...` : 'undefined or empty'
  })

  try {
    const firebaseApp = initializeApp(firebaseConfig)
    const firestore = getFirestore(firebaseApp)
    const auth = getAuth(firebaseApp)
    const functions = getFunctions(firebaseApp)

    return {
      provide: {
        firebaseApp,
        firestore,
        auth,
        functions,
        httpsCallable
      }
    }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    throw error // or handle appropriately
  }
})
