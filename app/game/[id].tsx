import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

// Mock de datos de juegos
const MOCK_GAMES_DATA = {
  "game-1": {
    id: "game-1",
    title: "The Legend of Zelda: Breath of the Wild",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
    year: 2017,
    developer: "Nintendo EPD",
    platforms: ["Nintendo Switch", "Wii U"],
    synopsis: "The Legend of Zelda: Breath of the Wild es un juego de acción y aventura desarrollado por Nintendo. Ambientado en el reino de Hyrule, el jugador controla a Link, quien despierta de un sueño de 100 años para descubrir que el reino ha sido devastado por Calamity Ganon. El juego presenta un mundo abierto masivo donde los jugadores pueden explorar libremente, resolver puzzles, combatir enemigos y descubrir secretos ocultos."
  },
  "zelda-botw": {
    id: "zelda-botw",
    title: "The Legend of Zelda: Breath of the Wild",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
    year: 2017,
    developer: "Nintendo EPD",
    platforms: ["Nintendo Switch", "Wii U"],
    synopsis: "Una aventura épica en un mundo abierto donde Link debe salvar Hyrule del malvado Calamity Ganon. Con mecánicas innovadoras de física y supervivencia, redefinió el género de mundo abierto."
  },
  "mario-odyssey": {
    id: "mario-odyssey",
    title: "Super Mario Odyssey",
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
    year: 2017,
    developer: "Nintendo EPD",
    platforms: ["Nintendo Switch"],
    synopsis: "Acompaña a Mario en una aventura masiva de plataformas 3D a través de varios reinos únicos. Con la ayuda de su nueva habilidad de capturar enemigos y objetos con Cappy, Mario debe rescatar a la Princesa Peach de Bowser."
  },
  "cyberpunk-2077": {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
    year: 2020,
    developer: "CD Projekt RED",
    platforms: ["PC", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X/S"],
    synopsis: "Un RPG de acción en primera persona ambientado en Night City, una megalópolis obsesionada con el poder, la gloria y las modificaciones corporales. Juegas como V, un mercenario que busca un implante único que es la clave de la inmortalidad."
  }
};

// Simulo llamada a API
const obtenerDatosJuego = async (gameId: string): Promise<any> => {
  // Delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const gameData = MOCK_GAMES_DATA[gameId as keyof typeof MOCK_GAMES_DATA];
  
  if (!gameData) {
    throw new Error(`Juego con ID ${gameId} no encontrado`);
  }
  
  return gameData;
};

interface GameData {
  id: string;
  title: string;
  coverImage: string;
  year: number;
  developer: string;
  platforms: string[];
  synopsis: string;
}

export default function GameDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await obtenerDatosJuego(id as string);
        setGameData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
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
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
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
      <SafeAreaView className="flex-1 bg-gray-50">
        <Stack.Screen 
          options={{
            title: "Error",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }} 
        />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-xl font-bold mb-2">😔 Error!</Text>
          <Text className="text-gray-700 text-center text-lg">
            {error || 'No se pudo cargar la información del juego'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{
          title: gameData.title,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1F2937',
          },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView className="flex-1">
        <View className="w-full h-80 bg-gray-200">
          <Image
            source={{ uri: gameData.coverImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {gameData.title}
          </Text>
          <View className="flex-row items-center mb-4">
            <Text className="text-lg text-gray-600 mr-4">
              {gameData.year}
            </Text>
            <Text className="text-lg text-gray-600">
              {gameData.developer}
            </Text>
          </View>
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Plataformas:
            </Text>
            <View className="flex-row flex-wrap">
              {gameData.platforms.map((platform, index) => (
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
              {gameData.synopsis}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

