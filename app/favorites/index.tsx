import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import GameCard from "@/components/GameCard";
import { useRouter, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { getUserFavorites, FeaturedGame } from "@/utils/api";

export default function FavoritesScreen() {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState<FeaturedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          setError(null);
          console.log("user.uid", user.uid);
          
          const games = await getUserFavorites(user.uid, getIdToken);
          console.log("games (final):", games);
          
          setFavoriteGames(games);
        } catch (error) {
          console.error("Error al obtener favoritos:", error);
          setError("No se pudieron cargar los favoritos");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user?.uid, getIdToken]);

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Text className="text-gray-400 text-xl font-semibold mb-3">
        No tienes juegos favoritos
      </Text>
      <Text className="text-gray-500 text-center leading-6">
        Explora juegos y marca los que más te gusten como favoritos para verlos aquí
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="text-gray-400 mt-4">Cargando favoritos...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Text className="text-red-400 text-xl font-semibold mb-3">
        Error al cargar
      </Text>
      <Text className="text-gray-500 text-center leading-6">
        {error}
      </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Favoritos",
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
      <View className="flex-1 bg-gray-900 px-4 pt-4">
        {loading ? renderLoadingState() : 
         error ? renderErrorState() :
         favoriteGames.length === 0 ? renderEmptyState() : (
          <FlatList
            data={favoriteGames}
            numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <GameCard
                gameId={item._id}
                imageUrl={item.imageUrl || ""}
                title={item.name}
                subtitle={`${item.genre?.join(", ") || "Juego"} - ${item.developerStudio || "Desarrollador"}`}
                isFavorite={true}
                onPress={() => router.push(`/game/${item._id}`)}
                onFavoriteToggle={(isFavorite) => {
                  if (!isFavorite) {
                    // Remover el juego de la lista local cuando se desmarca como favorito
                    setFavoriteGames(prev => prev.filter(game => game._id !== item._id));
                  }
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
         )}
      </View>
    </>
  );
}
