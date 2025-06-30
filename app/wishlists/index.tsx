import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter, Stack, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeView from "@/components/SafeView";
import WishlistCard from "@/components/WishlistCard";
import { useAuth } from "@/context/AuthContext";
import { getWishlists, Wishlist } from "@/utils/api";

export default function WishlistsScreen() {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlists = useCallback(async () => {
    if (!user?.uid) {
      return;
    }

    try {
      setError(null);
      const data = await getWishlists(getIdToken);
      const safeWishlists = Array.isArray(data) ? data : [];
      setWishlists(safeWishlists);
    } catch (err: any) {
      let errorMessage = "Error al cargar las wishlists";
      if (err.response) {
        errorMessage = `Error del servidor: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Error de conexión - No se pudo conectar al servidor";
      } else {
        errorMessage = err.message || "Error desconocido";
      }

      setError(errorMessage);
      setWishlists([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.uid, getIdToken]);

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  // Actualizar cuando la pantalla vuelve al foco
  useFocusEffect(
    useCallback(() => {
      fetchWishlists();
    }, [fetchWishlists])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchWishlists();
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Wishlists",
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
          <Text className="text-gray-600 mt-4">Cargando wishlists...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Wishlists",
          headerShown: true,
          headerBackTitle: "Atrás",
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/wishlists/create")}
              className="mr-2"
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        className="flex-1 bg-gray-50"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeView>
          <View className="flex-row justify-between items-start mb-8">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Wishlists
              </Text>
              <Text className="text-lg text-gray-500">
                Tus listas de juegos favoritos
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/wishlists/create")}
              className="bg-blue-500 px-4 py-2 rounded-lg ml-4"
            >
              <Text className="text-white font-semibold">Nueva</Text>
            </TouchableOpacity>
          </View>

          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <Text className="text-red-800">{error}</Text>
            </View>
          )}

          {!wishlists || wishlists.length === 0 ? (
            <View className="bg-white rounded-xl p-8 text-center">
              <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-center mt-4 text-lg">
                No tienes wishlists aún
              </Text>
              <Text className="text-gray-400 text-center mt-2 mb-6">
                ¡Crea tu primera wishlist para empezar!
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/wishlists/create")}
                className="bg-blue-500 px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-semibold text-center">
                  Crear mi primera wishlist
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {wishlists.filter(Boolean).map((wishlist: any) => (
                <WishlistCard
                  key={wishlist._id || wishlist.id}
                  id={wishlist._id || wishlist.id}
                  name={wishlist.title || "Sin título"}
                  owner={{
                    displayName:
                      wishlist.owner?.username ||
                      wishlist.owner?.displayName ||
                      "Usuario desconocido",
                    email: wishlist.owner?.email || "",
                  }}
                  gameCount={wishlist.games?.length || 0}
                  sharedCount={wishlist.sharedWith?.length || 0}
                  onPress={() =>
                    router.push({
                      pathname: `/wishlists/[id]`,
                      params: {
                        id: wishlist._id || wishlist.id,
                        wishlistData: JSON.stringify(wishlist),
                      },
                    })
                  }
                />
              ))}
            </View>
          )}
        </SafeView>
      </ScrollView>
    </>
  );
}
