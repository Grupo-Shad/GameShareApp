import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeView from "@/components/SafeView";
import { useAuth } from "@/context/AuthContext";
import { createWishlist } from "@/utils/api";

export default function CreateWishlistScreen() {
  const router = useRouter();
  const { getIdToken } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "El título es requerido");
      return;
    }

    setLoading(true);
    try {
      const newWishlist = await createWishlist(
        title.trim(),
        description.trim(),
        getIdToken
      );

      Alert.alert(
        "¡Wishlist creada!",
        `"${title}" ha sido creada exitosamente`,
        [
          {
            text: "Ver wishlist",
            onPress: () => {
              router.replace(`/wishlists/${newWishlist._id}`);
            },
          },
          {
            text: "Volver a la lista",
            onPress: () => {
              router.replace("/wishlists");
            },
          },
        ]
      );
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "No se pudo crear la wishlist";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const canCreate = title.trim().length > 0 && !loading;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Nueva Wishlist",
          headerShown: true,
          headerBackTitle: "Atrás",
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16,
          },
          headerShadowVisible: false,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-50"
      >
        <ScrollView className="flex-1">
          <SafeView>
            {/* Header */}
            <View className="mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Crear Nueva Wishlist
              </Text>
              <Text className="text-gray-600">
                Crea una lista personalizada de juegos que te gustaría tener
              </Text>
            </View>

            {/* Title Input */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <Text className="text-lg font-semibold text-gray-900 mb-3">
                Título *
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-900 text-base"
                placeholder="Ej: Juegos para el Verano 2024"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9CA3AF"
                maxLength={100}
              />
              <Text className="text-sm text-gray-500 mt-2">
                {title.length}/100 caracteres
              </Text>
            </View>

            {/* Description Input */}
            <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <Text className="text-lg font-semibold text-gray-900 mb-3">
                Descripción (opcional)
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-900 text-base"
                placeholder="Ej: Lista de juegos que quiero completar en las vacaciones"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text className="text-sm text-gray-500 mt-2">
                {description.length}/500 caracteres
              </Text>
            </View>

            {/* Create Button */}
            <TouchableOpacity
              onPress={handleCreate}
              disabled={!canCreate}
              className={`flex-row items-center justify-center py-4 rounded-xl mb-6 ${
                canCreate ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {loading ? (
                <Text className="text-white font-semibold text-lg">
                  Creando wishlist...
                </Text>
              ) : (
                <>
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color={canCreate ? "white" : "#9CA3AF"}
                  />
                  <Text
                    className={`font-semibold text-lg ml-2 ${
                      canCreate ? "text-white" : "text-gray-500"
                    }`}
                  >
                    Crear Wishlist
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Tips */}
            <View className="bg-blue-50 rounded-xl p-4">
              <View className="flex-row items-start mb-2">
                <Ionicons name="bulb" size={20} color="#3B82F6" />
                <Text className="text-blue-900 font-semibold ml-2">
                  Consejos
                </Text>
              </View>
              <Text className="text-blue-800 text-sm leading-5">
                • Usa títulos descriptivos para identificar fácilmente tus
                listas{"\n"}• Puedes agregar juegos después de crear la wishlist
                {"\n"}• Invita a amigos para que vean tus listas favoritas
              </Text>
            </View>
          </SafeView>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
