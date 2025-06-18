import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase Web SDK
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "demo-project.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "demo-project.appspot.com",
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:demo",
};

// Verificar que todas las variables de entorno estén configuradas
if (__DEV__) {
  const requiredVars = [
    "EXPO_PUBLIC_FIREBASE_API_KEY",
    "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "EXPO_PUBLIC_FIREBASE_PROJECT_ID",
    "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "EXPO_PUBLIC_FIREBASE_APP_ID",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn("⚠️ Variables de entorno faltantes:");
    missingVars.forEach((varName) => console.warn(`  - ${varName}`));
    console.warn(
      "🔥 Usando configuración demo. Por favor configura las variables en .env"
    );
  } else {
    console.log(
      "✅ Todas las variables de Firebase configuradas correctamente"
    );
  }
}

// Inicializar Firebase de forma más simple
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (__DEV__) {
  console.log("🔥 Firebase conectado correctamente");
  console.log("🔐 Auth configurado:", !!auth);
}

export { auth };
export default app;
