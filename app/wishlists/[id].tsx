import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import {
  useRouter,
  useLocalSearchParams,
  Stack,
  useFocusEffect,
} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeView from "@/components/SafeView";
import GameCard from "@/components/GameCard";
import { useAuth } from "@/context/AuthContext";
import {
  getWishlistById,
  unshareWishlist,
  removeGameFromWishlist,
  Wishlist,
} from "@/utils/api";

export default function WishlistDetailScreen() {
  const router = useRouter();
  const { id, wishlistData } = useLocalSearchParams();
  const { user, getIdToken } = useAuth();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  const fetchWishlist = async () => {
    if (!id || typeof id !== "string") return;

    try {
      setError(null);
      const data = await getWishlistById(id, getIdToken);
      setWishlist(data);
      setLastRefreshTime(Date.now());
    } catch (err: any) {
      if (!wishlist) {
        if (err.response?.status === 404) {
          setError("Wishlist no encontrada");
        } else if (err.response?.status === 403) {
          setError("No tienes permiso para ver esta wishlist");
        } else if (!navigator.onLine) {
          setError("Sin conexión a internet");
        } else {
          setError("Error al cargar la wishlist. Intenta nuevamente.");
        }
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (wishlistData && typeof wishlistData === "string") {
      try {
        const parsedWishlist = JSON.parse(wishlistData);
        setWishlist({
          ...parsedWishlist,
          _id: parsedWishlist._id || parsedWishlist.id,
          sharedWith: parsedWishlist.sharedWith || [],
          games: parsedWishlist.games || [],
        });
        setLoading(false);
        setLastRefreshTime(Date.now());
      } catch (err) {
        fetchWishlist();
      }
    } else {
      setLastRefreshTime(Date.now());
      fetchWishlist();
    }
  }, [id, wishlistData]);

  useFocusEffect(
    useCallback(() => {
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshTime;
      const minRefreshInterval = 3000;

      const shouldRefresh =
        wishlist &&
        !loading &&
        !refreshing &&
        !error &&
        timeSinceLastRefresh > minRefreshInterval &&
        id;

      if (shouldRefresh) {
        setLastRefreshTime(now);
        fetchWishlist();
      }
    }, [wishlist?._id, loading, refreshing, error, lastRefreshTime, id])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    setLastRefreshTime(Date.now());

    try {
      if (wishlist && id) {
        await fetchWishlist();
      }
    } catch (err) {
      // Error handling is done in fetchWishlist
    } finally {
      setRefreshing(false);
    }
  };

  const handleRemoveUser = async (shareId: string, userName: string) => {
    if (!wishlist || !user?.uid) return;

    Alert.alert(
      "Remover usuario",
      `¿Estás seguro de que quieres remover a ${userName} de esta wishlist?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              if (wishlist._id && user.uid) {
                await unshareWishlist(wishlist._id, shareId, getIdToken);
              }
              fetchWishlist(); // Refresh data
            } catch (err) {
              Alert.alert("Error", "No se pudo remover el usuario");
            }
          },
        },
      ]
    );
  };

  const handleRemoveGame = async (gameId: string, gameName: string) => {
    if (!wishlist) return;

    Alert.alert(
      "Remover juego",
      `¿Estás seguro de que quieres remover "${gameName}" de esta wishlist?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              if (wishlist._id && user?.uid) {
                await removeGameFromWishlist(
                  wishlist._id,
                  gameId,
                  user.uid,
                  getIdToken
                );

                const updatedWishlist = {
                  ...wishlist,
                  games: wishlist.games.filter((gameEntry) => {
                    const currentGameId =
                      gameEntry.game?._id ||
                      (gameEntry.game as any)?.id ||
                      gameEntry._id;
                    return currentGameId !== gameId;
                  }),
                };

                setWishlist(updatedWishlist);
              } else {
                Alert.alert("Error", "Datos de usuario o wishlist faltantes");
              }
            } catch (err: any) {
              Alert.alert("Error", "No se pudo remover el juego");
            }
          },
        },
      ]
    );
  };

  // More robust owner detection
  const isOwner =
    user?.uid === wishlist?.owner._id ||
    user?.uid === wishlist?.owner.firebaseUid ||
    user?.email === wishlist?.owner.email;

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Cargando...",
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
        <View className="flex-1 bg-gray-50 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4">Cargando wishlist...</Text>
        </View>
      </>
    );
  }

  if (error || !wishlist) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Error",
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
        <View className="flex-1 bg-gray-50 justify-center items-center p-4">
          <Ionicons name="alert-circle" size={64} color="#EF4444" />
          <Text className="text-red-600 text-center mb-6 text-lg">
            {error || "Wishlist no encontrada"}
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => {
                setError(null);
                setLoading(true);
                fetchWishlist();
              }}
              className="bg-blue-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Reintentar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-gray-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: wishlist.title,
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
      <ScrollView
        className="flex-1 bg-gray-50"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeView>
          {/* Header Info */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              {wishlist.title}
            </Text>
            <View className="flex-row items-center mb-3">
              <Ionicons name="person" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">
                Creada por{" "}
                {wishlist.owner.displayName ||
                  wishlist.owner.username ||
                  "Usuario desconocido"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Ionicons name="game-controller" size={16} color="#10B981" />
                <Text className="text-sm text-gray-600 ml-1">
                  {wishlist.games.length} juegos
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#3B82F6" />
                <Text className="text-sm text-gray-600 ml-1">
                  {wishlist.sharedWith?.length || 0} compartida
                  {(wishlist.sharedWith?.length || 0) !== 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* Games Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold text-gray-900">
                Juegos
              </Text>
              {isOwner && (
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/wishlists/${wishlist._id}/add-game`)
                  }
                  className="bg-blue-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Agregar</Text>
                </TouchableOpacity>
              )}
            </View>

            {wishlist.games.length === 0 ? (
              <View className="bg-white rounded-xl p-8">
                <Text className="text-gray-500 text-center mb-4">
                  No hay juegos en esta wishlist
                </Text>
                {isOwner && (
                  <>
                    <Text className="text-gray-400 text-center mb-6">
                      ¡Agrega tu primer juego!
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        router.push(`/wishlists/${wishlist._id}/add-game`)
                      }
                      className="bg-blue-500 px-6 py-3 rounded-lg mx-auto mb-4"
                    >
                      <View className="flex-row items-center">
                        <Ionicons name="add" size={20} color="white" />
                        <Text className="text-white font-semibold ml-2">
                          Agregar juego
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {wishlist.games.map((gameEntry, index) => {
                  // Handle different possible structures
                  const game = gameEntry.game || gameEntry;
                  const gameId =
                    game?._id ||
                    (game as any)?.id ||
                    gameEntry._id ||
                    (gameEntry as any)?.id ||
                    `game-${index}`;
                  const imageSrc = game?.imageUrl || (game as any)?.image || "";
                  const title =
                    game?.name || (game as any)?.title || "Juego sin nombre";
                  const subtitle =
                    game?.genre?.join?.(", ") ||
                    (game as any)?.genres?.join?.(", ") ||
                    game?.genre ||
                    "Sin género";

                  return (
                    <View key={gameId} className="w-[48%] mb-4">
                      <GameCard
                        imageUrl={imageSrc}
                        title={title}
                        subtitle={subtitle}
                        onPress={() => router.push(`/game/${gameId}`)}
                      />
                      {isOwner && (
                        <TouchableOpacity
                          onPress={() => handleRemoveGame(gameId, title)}
                          className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                        >
                          <Ionicons name="close" size={12} color="white" />
                        </TouchableOpacity>
                      )}
                      {(gameEntry.notes || (gameEntry as any).note) && (
                        <Text className="text-xs text-gray-600 mt-1 px-2">
                          {gameEntry.notes || (gameEntry as any).note}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Shared Users Section - Only show if owner */}
          {isOwner && (
            <View>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-gray-900">
                  Usuarios invitados
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/wishlists/${wishlist._id}/manage-users`)
                  }
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Invitar</Text>
                </TouchableOpacity>
              </View>

              {(wishlist.sharedWith?.length || 0) === 0 ? (
                <View className="bg-white rounded-xl p-8">
                  <Text className="text-gray-500 text-center">
                    No has compartido esta wishlist
                  </Text>
                  <Text className="text-gray-400 text-center mt-2">
                    ¡Invita a tus amigos para que puedan verla!
                  </Text>
                </View>
              ) : (
                <View className="bg-white rounded-xl p-4">
                  {wishlist.sharedWith?.map((share) => (
                    <View
                      key={share._id}
                      className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <View>
                        <Text className="font-semibold text-gray-900">
                          {share.user.displayName}
                        </Text>
                        <Text className="text-sm text-gray-600">
                          {share.user.email}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          handleRemoveUser(share._id, share.user.displayName)
                        }
                        className="bg-red-100 p-2 rounded-lg"
                      >
                        <Ionicons name="trash" size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  )) || []}
                </View>
              )}
            </View>
          )}
        </SafeView>
      </ScrollView>
    </>
  );
}
