import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import FeaturedGameCard from "@/components/FeaturedGameCard";
import SafeView from "@/components/SafeView";
import { getFeaturedGames, FeaturedGame } from "@/utils/api";
import { router } from "expo-router";

export default function HomeScreen() {
  const [games, setGames] = useState<FeaturedGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedGames = async () => {
      try {
        setLoading(true);
        const featuredGames = await getFeaturedGames();
        setGames(featuredGames);
      } catch (error) {
        console.error("Error loading featured games:", error);
      } finally {
        setLoading(false);
      }
    };

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
              key={game.id}
              name={game.name}
              imageUrl={game.imageUrl}
              score={game.score}
              description={game.description}
              genres={game.genre}
              developerStudio={game.developerStudio}
              publisher={game.publisher}
              releaseDate={game.releaseDate}
              onPress={() => {
                router.push(`/game/${game.id}`);
              }}
            />
          ))}
        </View>
      </SafeView>
    </ScrollView>
  );
}
