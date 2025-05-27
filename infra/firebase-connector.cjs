const { initializeApp } = require('firebase/app');
const { initializeAuth, browserLocalPersistence } = require('firebase/auth');
const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage');

// Using .cjs because metro's lack of support for top-level async-await

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function initializeAuthByEnvironment(app) {
  // Test Environment
  if (process.env.NODE_ENV === 'test') {
    console.log('Initialize auth for Testing...');
    return initializeAuth(app);
  }

  // React Native Environment
  // Product will contain ReactNative
  if (navigator.product === 'ReactNative') {
    // Only importing getReactNativePersistence here, so automated tests works
    console.log('Initializing auth for ReactNative bundle...');
    const { getReactNativePersistence } = require('firebase/auth');
    return initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }

  // Web Browser Environment
  console.log('Initializing auth for browser...');
  return initializeAuth(app, { persistence: browserLocalPersistence });
}

const app = initializeApp(firebaseConfig);
const auth = initializeAuthByEnvironment(app);

module.exports = { app, auth };
