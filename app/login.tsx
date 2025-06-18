import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      Alert.alert("Éxito", "¡Bienvenido de vuelta!", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 pt-20">
          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="lock-closed" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Inicia sesión en tu cuenta
            </Text>
          </View>

          {/* Formulario */}
          <View className=" mb-8">
            {/* Email */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </Text>
              <View className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-base text-gray-900"
                  placeholder="tu@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Contraseña */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </Text>
              <View className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#6B7280"
                />
                <TextInput
                  className="flex-1 ml-3 text-base text-gray-900"
                  placeholder="Tu contraseña"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="ml-2"
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Olvidé mi contraseña */}
            <TouchableOpacity className="self-end" disabled={isLoading}>
              <Text className="text-sm text-blue-500 font-medium">
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botón de Login */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`rounded-xl py-4 mb-6 ${
              isLoading ? "bg-blue-300" : "bg-blue-500"
            }`}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-sm text-gray-500">O continúa con</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Botones de Login Social */}
          <View className="flex-row space-x-4 mb-8">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center bg-white rounded-xl py-3 border border-gray-200"
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text className="ml-2 text-gray-700 font-medium">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center bg-white rounded-xl py-3 border border-gray-200"
              disabled={isLoading}
            >
              <Ionicons name="logo-apple" size={20} color="#000000" />
              <Text className="ml-2 text-gray-700 font-medium">Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Link a Registro */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600">¿No tienes cuenta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity disabled={isLoading}>
                <Text
                  className={`font-semibold ${isLoading ? "text-gray-400" : "text-blue-500"}`}
                >
                  Regístrate
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
