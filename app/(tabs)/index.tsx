import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import FeaturedGameCard from "@/components/FeaturedGameCard";
import SafeView from "@/components/SafeView";
import { getFeaturedGames, FeaturedGame } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function HomeScreen() {
  const [games, setGames] = useState<FeaturedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getIdToken } = useAuth();

  const loadFeaturedGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const featuredGames = await getFeaturedGames(getIdToken);
      setGames(featuredGames);
    } catch (error) {
      setError("Error al cargar los juegos. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedGames();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">
          Cargando juegos destacados...
        </Text>
      </View>
    );
  }

  // Mostrar error o estado vacío con botón de reintentar
  if (error || games.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-6">
        <Text className="text-xl font-semibold text-gray-900 mb-2 text-center">
          {error || "No hay juegos disponibles"}
        </Text>
        <Text className="text-gray-600 mb-6 text-center">
          {error
            ? "Verifica tu conexión a internet e inténtalo nuevamente"
            : "No se encontraron juegos destacados en este momento"}
        </Text>
        <TouchableOpacity
          onPress={loadFeaturedGames}
          className="bg-blue-500 px-6 py-3 rounded-lg active:bg-blue-600"
        >
          <Text className="text-white font-semibold text-center">
            Reintentar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <SafeView>
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido a GameShare!
        </Text>
        <Text className="text-gray-600 mb-6">
          Descubre los mejores juegos del momento
        </Text>

        {/* Grid de juegos destacados */}
        <View className="space-y-4">
          {games.map((game) => (
            <FeaturedGameCard
              key={game._id}
              gameId={game._id}
              name={game.name}
              imageUrl={game.imageUrl}
              score={game.score}
              description={game.description}
              genres={game.genre}
              developerStudio={game.developerStudio}
              publisher={game.publisher}
              releaseDate={game.releaseDate}
              isFavorite={game.isFavorite}
              onPress={() => {
                router.push(`/game/${game._id}`);
              }}
            />
          ))}
        </View>
      </SafeView>
    </ScrollView>
  );
}
