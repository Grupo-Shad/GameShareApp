# 🔥 Configuración de React Native Firebase

## ⚠️ Cambio importante: Ahora usando React Native Firebase

Has instalado `@react-native-firebase/app` y `@react-native-firebase/auth`, que es la implementación nativa recomendada para React Native.

## Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ejemplo: "mi-app-auth")
4. Acepta los términos y crea el proyecto

## Paso 2: Configurar Authentication

1. En la consola de Firebase, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Ve a la pestaña **Sign-in method**
4. Habilita **Email/Password**
5. (Opcional) Habilita **Google** y **Apple** para login social

## Paso 3: Configurar para Android

### 3.1 Agregar aplicación Android

1. Ve a **Configuración del proyecto** (ícono de engranaje ⚙️)
2. Haz clic en **Agregar aplicación** > **Android**
3. **Nombre del paquete de Android**: `com.gameshareapp` (debe coincidir con app.json)
4. **Apodo de la aplicación**: "Game Share App Android"
5. **SHA-1**: Opcional por ahora (para desarrollo)
6. Haz clic en **Registrar aplicación**

### 3.2 Descargar google-services.json

1. Descarga el archivo `google-services.json`
2. Colócalo en `android/app/google-services.json`

```bash
# Estructura esperada:
android/
  app/
    google-services.json  ← Aquí va el archivo
```

## Paso 4: Configurar para iOS

### 4.1 Agregar aplicación iOS

1. Ve a **Configuración del proyecto** (ícono de engranaje ⚙️)
2. Haz clic en **Agregar aplicación** > **iOS**
3. **ID del paquete de iOS**: `com.gameshareapp` (debe coincidir con app.json)
4. **Apodo de la aplicación**: "Game Share App iOS"
5. **ID de App Store**: Opcional por ahora
6. Haz clic en **Registrar aplicación**

### 4.2 Descargar GoogleService-Info.plist

1. Descarga el archivo `GoogleService-Info.plist`
2. Colócalo en `ios/GameShareApp/GoogleService-Info.plist`

```bash
# Estructura esperada:
ios/
  GameShareApp/
    GoogleService-Info.plist  ← Aquí va el archivo
```

## Paso 5: Ejecutar prebuild

Con los archivos de configuración en su lugar:

```bash
# Limpiar cachés anteriores
npx expo prebuild --clean

# O simplemente
npx expo prebuild
```

## Paso 6: Compilar la aplicación

```bash
# Para Android
npx expo run:android

# Para iOS
npx expo run:ios
```

## ✅ Ventajas de React Native Firebase

- ✅ **Rendimiento nativo** - No requiere bridge JavaScript
- ✅ **Configuración más simple** - No necesitas variables de entorno
- ✅ **Funcionalidades completas** - Acceso a todas las características de Firebase
- ✅ **Mejor integración** - Push notifications, analytics, etc.
- ✅ **Menos bugs** - Implementación oficial de Google

## 🚨 Archivos de configuración requeridos

### Android: `android/app/google-services.json`

```json
{
  "project_info": {
    "project_number": "123456789",
    "project_id": "tu-proyecto-id"
    // ... resto de configuración
  }
}
```

### iOS: `ios/GameShareApp/GoogleService-Info.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>API_KEY</key>
    <string>tu-api-key</string>
    <!-- ... resto de configuración -->
</dict>
</plist>
```

## 🛠️ Solución de problemas

### Error: "Invalid format of Android package name"

- ✅ **Solucionado**: Cambiamos `com.game-share-app` a `com.gameshareapp`
- Los guiones no están permitidos en nombres de paquete Android

### Error: "google-services.json not found"

1. Descarga `google-services.json` de Firebase Console
2. Colócalo en `android/app/google-services.json`
3. Ejecuta `npx expo prebuild --clean`

### Error: "GoogleService-Info.plist not found"

1. Descarga `GoogleService-Info.plist` de Firebase Console
2. Colócalo en `ios/[AppName]/GoogleService-Info.plist`
3. Ejecuta `npx expo prebuild --clean`

### Error durante prebuild

```bash
# Limpiar todo y empezar de nuevo
rm -rf android ios node_modules
npm install
npx expo prebuild --clean
```

## 📱 Estructura de archivos final

```
tu-proyecto/
├── android/
│   └── app/
│       └── google-services.json
├── ios/
│   └── GameShareApp/
│       └── GoogleService-Info.plist
├── config/
│   └── firebase.ts
├── context/
│   └── AuthContext.tsx
└── app.json (con package names corregidos)
```

## 🚀 Próximos pasos

1. **Descargar archivos de configuración** de Firebase Console
2. **Colocarlos en las rutas correctas**
3. **Ejecutar prebuild limpio**
4. **Compilar y probar** en dispositivo/emulador

¡Ahora tu app usa React Native Firebase nativo! 🎉
