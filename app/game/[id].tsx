import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { getGameData, FeaturedGame } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

export default function GameDetail() {
  const { id } = useLocalSearchParams();
  const [gameData, setGameData] = useState<FeaturedGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getIdToken } = useAuth();
  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGameData(id as string, getIdToken);
        setGameData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadGameData();
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <Stack.Screen
          options={{
            title: "Cargando...",
          }}
        />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4 text-lg">Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !gameData) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 mx-4">
        <Stack.Screen
          options={{
            title: "Error",
          }}
        />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-xl font-bold mb-2">😔 Error!</Text>
          <Text className="text-gray-700 text-center text-lg">
            {error || "No se pudo cargar la información del juego"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: gameData.name,
        }}
      />

      <ScrollView className="flex-1">
        <View className="w-full h-80 bg-gray-200">
          <Image
            source={{ uri: gameData.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {gameData.name}
          </Text>
          <View className="flex-row items-center mb-4">
            <Text className="text-lg text-gray-600 mr-4">
              {gameData.releaseDate}
            </Text>
            <Text className="text-lg text-gray-600">
              {gameData.developerStudio}
            </Text>
          </View>
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Plataformas:
            </Text>
            <View className="flex-row flex-wrap">
              {gameData.availablePlatforms?.map((platform, index) => (
                <View
                  key={index}
                  className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <Text className="text-sm text-blue-800 font-medium">
                    {platform}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Argumento
            </Text>
            <Text className="text-base text-gray-700 leading-6">
              {gameData.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
