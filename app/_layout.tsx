import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3b82f6", // bg-blue-500
          },
          headerTintColor: "#ffffff", // text-white
          headerTitleStyle: {
            fontWeight: "bold",
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
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* ✅ MEJORA: Agregamos opciones para not-found */}
        <Stack.Screen
          name="not-found"
          options={{
            title: "Página no encontrada",
            headerShown: true,
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </AuthProvider>
  );
}
