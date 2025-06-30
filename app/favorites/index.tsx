import React from "react";
import { View, FlatList } from "react-native";
import GameCard from "@/components/GameCard";
import { useRouter, Stack } from "expo-router";

const games = [
  {
    id: "1",
    title: "The Witcher 3",
    subtitle: "RPG - CD Projekt",
    imageUrl:
      "https://image.api.playstation.com/vulcan/img/cfn/11307AkQcrbgZ7mT3j6q2P7D5KL4V8WyYZDQzT1cx9MZ-63GlwZw3IdYr_MksKXH6UMu2SlPYHpsDZ3mlOEQAXUgeOo.png",
  },
  {
    id: "2",
    title: "God of War",
    subtitle: "Acción - Santa Monica Studio",
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-hub-hero-desktop-01-en-08sep21?$1600px$",
  },
  {
    id: "3",
    title: "God of War",
    subtitle: "Acción - Santa Monica Studio",
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-hub-hero-desktop-01-en-08sep21?$1600px$",
  },
  {
    id: "4",
    title: "God of War",
    subtitle: "Acción - Santa Monica Studio",
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-hub-hero-desktop-01-en-08sep21?$1600px$",
  },
  {
    id: "5",
    title: "God of War",
    subtitle: "Acción - Santa Monica Studio",
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-hub-hero-desktop-01-en-08sep21?$1600px$",
  },
];

export default function FavoritesScreen() {
  const router = useRouter();

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
        <FlatList
          data={games}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              imageUrl={item.imageUrl}
              title={item.title}
              subtitle={item.subtitle}
              onPress={() => router.push(`/game/${item.id}`)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}
