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
import { validateRegisterForm, RegisterFormData } from "../utils/validation";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const formDataToValidate: RegisterFormData = {
      ...formData,
      acceptTerms,
    };

    const validation = validateRegisterForm(formDataToValidate);

    if (!validation.isValid) {
      Alert.alert("Error", validation.message);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register(formData.email, formData.password, formData.name);
      Alert.alert("Éxito", "¡Cuenta creada exitosamente!", [
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
        <View className="flex-1 px-6 pt-16">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="person-add" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Crear Cuenta
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Únete a nuestra comunidad
            </Text>
          </View>

          {/* Formulario */}
          <View className=" mb-6">
            {/* Nombre */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </Text>
              <View className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-base text-gray-900"
                  placeholder="Tu nombre completo"
                  placeholderTextColor="#9CA3AF"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  autoCapitalize="words"
                  autoComplete="name"
                  editable={!isLoading}
                />
              </View>
            </View>

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
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
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
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
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

            {/* Confirmar Contraseña */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </Text>
              <View className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#6B7280"
                />
                <TextInput
                  className="flex-1 ml-3 text-base text-gray-900"
                  placeholder="Repite tu contraseña"
                  placeholderTextColor="#9CA3AF"
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="new-password"
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2"
                  disabled={isLoading}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Términos y Condiciones */}
            <TouchableOpacity
              onPress={() => setAcceptTerms(!acceptTerms)}
              className="flex-row items-start mt-4"
              disabled={isLoading}
            >
              <View
                className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center ${
                  acceptTerms
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {acceptTerms && (
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                )}
              </View>
              <Text className="flex-1 text-sm text-gray-600 leading-5">
                Acepto los{" "}
                <Text className="text-blue-500 font-medium">
                  términos y condiciones
                </Text>{" "}
                y{" "}
                <Text className="text-blue-500 font-medium">
                  política de privacidad
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botón de Registro */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className={`rounded-xl py-4 mb-6 ${
              isLoading ? "bg-green-300" : "bg-green-500"
            }`}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Text>
          </TouchableOpacity>

          {/* TODO: Implementar autenticación con Google
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-sm text-gray-500">O regístrate con</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          
          <View className="flex space-x-4 mb-8">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center bg-white rounded-xl py-3 border border-gray-200"
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text className="ml-2 text-gray-700 font-medium">Google</Text>
            </TouchableOpacity>
          </View>
          */}

          {/* Link a Login */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600">¿Ya tienes cuenta? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity disabled={isLoading}>
                <Text
                  className={`font-semibold ${isLoading ? "text-gray-400" : "text-blue-500"}`}
                >
                  Inicia Sesión
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
