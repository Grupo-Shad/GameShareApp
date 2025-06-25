import { View, Text, ScrollView } from "react-native";
import GameCard from "@/components/GameCard";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 my-10 bg-gray-50">
      <View className="p-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido!
        </Text>
        <GameCard
          imageUrl="https://via.placeholder.com/150"
          title="Game 1"
          subtitle="Subtitle for game 1"
        />
      </View>
    </ScrollView>
  );
}
