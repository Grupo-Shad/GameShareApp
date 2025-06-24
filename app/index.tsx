import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

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
      <View className="w-48 h-48 rounded-full items-center justify-center mb-8">
        <Image
          source={require("../assets/logo.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <Text className="text-lg text-gray-600 text-center mb-12 leading-6">
        Bienvenido a la aplicación ideal para compartir tus juegos con amigos!
      </Text>

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
      </View>
      {/* Información adicional */}
      <View className="mt-12 items-center">
        <Text className="text-sm text-gray-500 mb-2 text-center mx-20">
          Hecho por: Franco Machiavello, Tomas Amendolara, Julian Gonzalez
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text className="text-sm text-gray-500 ml-1">Versión 1.0.0</Text>
        </View>
      </View>
    </View>
  );
}
