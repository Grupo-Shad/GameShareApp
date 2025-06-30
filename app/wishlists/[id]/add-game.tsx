import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeView from "@/components/SafeView";
import GameCard from "@/components/GameCard";
import { useAuth } from "@/context/AuthContext";
import {
  getGames,
  searchGames,
  addGameToWishlist,
  FeaturedGame,
} from "@/utils/api";

export default function AddGameScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getIdToken } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<FeaturedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [debouncing, setDebouncing] = useState(false);
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadDefaultGames();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setDebouncing(true);
      const debounceTimer = setTimeout(() => {
        setDebouncing(false);
        searchForGames();
      }, 1000);

      return () => {
        clearTimeout(debounceTimer);
        setDebouncing(false);
      };
    } else {
      if (searchQuery.trim().length === 0) {
        loadDefaultGamesQuiet();
      } else {
        setGames([]);
      }
      setDebouncing(false);
    }
  }, [searchQuery]);

  const loadDefaultGames = async () => {
    setLoading(true);
    try {
      const data = await getGames(getIdToken);
      setGames(data);
    } catch (err) {
      Alert.alert("Error", "No se pudieron cargar los juegos");
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultGamesQuiet = async () => {
    try {
      const data = await getGames(getIdToken);
      setGames(data);
    } catch (err) {
      setGames([]);
    }
  };

  const searchForGames = useCallback(async () => {
    setSearching(true);
    try {
      const data = await searchGames(searchQuery.trim(), getIdToken);
      setGames(data);
    } catch (err) {
      setGames([]);
    } finally {
      setSearching(false);
    }
  }, [searchQuery, getIdToken]);

  const handleAddGame = async (game: FeaturedGame) => {
    if (!id || typeof id !== "string") return;

    setAdding(game._id);
    try {
      await addGameToWishlist(
        id,
        game._id,
        notes.trim() || undefined,
        getIdToken
      );
      Alert.alert("¡Éxito!", `"${game.name}" agregado a la wishlist`, [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (err) {
      Alert.alert("Error", "No se pudo agregar el juego");
    } finally {
      setAdding(null);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Agregar Juego",
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
        <View className="flex-1 bg-gray-900 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-400 mt-4">Cargando juegos...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Agregar Juego",
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
      <View className="flex-1 bg-gray-50">
        <SafeView className="flex-1">
          {/* Buscador de juegos */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Buscar juegos
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900"
                placeholder="Buscar por nombre o género..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
              />
            </View>
            <Text className="text-sm text-gray-500 mt-2">
              Escribe al menos 2 caracteres para buscar
            </Text>
          </View>

          {/* Indicador de espera */}
          {debouncing && (
            <View className="bg-yellow-50 rounded-xl p-4 mb-4 shadow-sm border border-yellow-200">
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#F59E0B" />
                <Text className="text-yellow-700 ml-2">Esperando...</Text>
              </View>
            </View>
          )}

          {/* Indicador de búsqueda */}
          {searching && (
            <View className="bg-blue-50 rounded-xl p-4 mb-4 shadow-sm border border-blue-200">
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text className="text-blue-700 ml-2">Buscando juegos...</Text>
              </View>
            </View>
          )}

          {/* Lista de juegos */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Mensaje sin resultados */}
            {games.length === 0 &&
              searchQuery.trim().length >= 2 &&
              !searching &&
              !debouncing && (
                <View className="bg-white rounded-xl p-8 mb-4 shadow-sm">
                  <Text className="text-gray-500 text-center">
                    No se encontraron juegos
                  </Text>
                  <Text className="text-gray-400 text-center mt-2">
                    Intenta con otro término de búsqueda
                  </Text>
                </View>
              )}

            {/* Grilla de juegos */}
            {games.length > 0 && (
              <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <View className="flex-row flex-wrap">
                  {games.map((game, index) => {
                    const gameId = game._id || (game as any).id;
                    const gameName =
                      game.name || (game as any).title || "Sin título";

                    return (
                      <View
                        key={gameId || `game-${index}`}
                        className="w-1/2 p-2"
                      >
                        <View className="relative">
                          <GameCard
                            imageUrl={game.imageUrl || ""}
                            title={gameName}
                            subtitle={
                              (game.genre || []).join(", ") || "Sin género"
                            }
                            onPress={() => handleAddGame(game)}
                          />

                          {/* Overlay de carga */}
                          {adding === gameId && (
                            <View className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                              <ActivityIndicator size="large" color="white" />
                            </View>
                          )}

                          {/* Botón agregar */}
                          <TouchableOpacity
                            onPress={() => handleAddGame(game)}
                            className="absolute top-2 right-2 bg-green-500 rounded-full p-2 shadow-lg"
                            disabled={adding === gameId}
                          >
                            <Ionicons name="add" size={16} color="white" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </SafeView>
      </View>
    </>
  );
}
