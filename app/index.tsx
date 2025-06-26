import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.replace("/(tabs)");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Cargando...</Text>
      </View>
    );
  }

  // Si hay usuario, no mostrar nada ya que se está redirigiendo
  if (user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  // Si no está autenticado, mostrar pantalla de bienvenida
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-4">
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
