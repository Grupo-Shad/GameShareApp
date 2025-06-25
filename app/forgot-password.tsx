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
import {
  validateForgotPasswordForm,
  ForgotPasswordFormData,
} from "../utils/validation";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    const formData: ForgotPasswordFormData = { email };
    const validation = validateForgotPasswordForm(formData);

    if (!validation.isValid) {
      Alert.alert("Error", validation.message);
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      Alert.alert(
        "¡Email enviado!",
        `Se ha enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada y sigue las instrucciones.`,
        [
          {
            text: "Entendido",
            onPress: () => router.back(),
          },
        ]
      );
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
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-0 top-0 p-2"
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>

            <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="key" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              ¿Olvidaste tu contraseña?
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              No te preocupes, te enviaremos un enlace para recuperarla
            </Text>
          </View>

          {/* Formulario */}
          <View className="mb-8">
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
          </View>

          {/* Botón de Enviar */}
          <TouchableOpacity
            onPress={handleResetPassword}
            disabled={isLoading}
            className={`rounded-xl py-4 mb-6 ${
              isLoading ? "bg-orange-300" : "bg-orange-500"
            }`}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
            </Text>
          </TouchableOpacity>

          {/* Información adicional */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-medium text-blue-900 mb-1">
                  ¿Qué hacer después?
                </Text>
                <Text className="text-sm text-blue-700">
                  1. Revisa tu bandeja de entrada{"\n"}
                  2. Busca el email de GameShare{"\n"}
                  3. Haz clic en el enlace para crear una nueva contraseña{"\n"}
                  4. Si no lo ves, revisa tu carpeta de spam
                </Text>
              </View>
            </View>
          </View>

          {/* Link de regreso */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600">¿Recordaste tu contraseña? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity disabled={isLoading}>
                <Text
                  className={`font-semibold ${isLoading ? "text-gray-400" : "text-blue-500"}`}
                >
                  Inicia sesión
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
