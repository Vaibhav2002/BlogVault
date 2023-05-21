import {FirebaseApp, FirebaseOptions, getApps, initializeApp} from "firebase/app";
import {getAnalytics} from "@firebase/analytics";

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let app: FirebaseApp | undefined;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}

const analytics = () => {
    if (typeof window !== 'undefined' && app)
        return getAnalytics(app)
    else return null
}

export {analytics}