import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 16,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="login"
            options={{
              title: "Iniciar Sesión",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              title: "Crear Cuenta",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="forgot-password"
            options={{
              title: "Recuperar Contraseña",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="not-found"
            options={{
              title: "Página no encontrada",
              headerShown: true,
            }}
          />
        </Stack>

        <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
