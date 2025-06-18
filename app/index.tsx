import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

// ✅ CAMBIO PRINCIPAL: export default en lugar de export function
export default function HomeScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Cargando...</Text>
      </View>
    );
  }

  // Si el usuario está autenticado, mostrar mensaje de bienvenida
  if (user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <View className="w-24 h-24 bg-green-500 rounded-full items-center justify-center mb-8">
          <Ionicons name="checkmark-circle" size={48} color="#FFFFFF" />
        </View>

        <Text className="text-4xl font-bold text-gray-900 mb-4 text-center">
          ¡Hola, {user.displayName || "Usuario"}!
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-12 leading-6">
          Has iniciado sesión correctamente. Explora la aplicación usando las
          tabs.
        </Text>

        <Link href="/(tabs)" asChild>
          <TouchableOpacity className="bg-blue-500 rounded-xl py-4 px-8 flex-row items-center justify-center">
            <Ionicons name="grid-outline" size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold ml-2">
              Explorar Aplicación
            </Text>
          </TouchableOpacity>
        </Link>

        <View className="mt-12 items-center">
          <Text className="text-sm text-gray-500 mb-2">
            Usuario: {user.email}
          </Text>
        </View>
      </View>
    );
  }

  // Si no está autenticado, mostrar pantalla de bienvenida
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-6">
      {/* Logo/Icono Principal */}
      <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-8">
        <Ionicons name="apps" size={48} color="#FFFFFF" />
      </View>

      {/* Título y Descripción */}
      <Text className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Mi Aplicación
      </Text>
      <Text className="text-lg text-gray-600 text-center mb-12 leading-6">
        Bienvenido a tu nueva aplicación móvil con autenticación y navegación
        por tabs
      </Text>

      {/* Botones de Navegación */}
      {/* ✅ CAMBIO: Removido space-y-4 y agregado mb-4 manualmente */}
      <View className="w-full max-w-sm">
        {/* Botón de Login */}
        <Link href="/login" asChild>
          <TouchableOpacity className="bg-blue-500 rounded-xl py-4 w-full flex-row items-center justify-center mb-4">
            <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold ml-2">
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Botón de Registro */}
        <Link href="/register" asChild>
          <TouchableOpacity className="bg-green-500 rounded-xl py-4 w-full flex-row items-center justify-center mb-4">
            <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold ml-2">
              Crear Cuenta
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Botón de Tabs (Demo) */}
        <Link href="/(tabs)" asChild>
          <TouchableOpacity className="bg-gray-800 rounded-xl py-4 w-full flex-row items-center justify-center">
            <Ionicons name="grid-outline" size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold ml-2">
              Ver Tabs (Demo)
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Información adicional */}
      <View className="mt-12 items-center">
        <Text className="text-sm text-gray-500 mb-2">
          Construido con Expo Router + NativeWind
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text className="text-sm text-gray-500 ml-1">Versión 1.0.0</Text>
        </View>
      </View>
    </View>
  );
}
