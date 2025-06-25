import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function YourGamesScreen() {
  const router = useRouter(); 

  const options = [
    {
      id: 1,
      title: "Juegos Favoritos",
      message: "Tus juegos favoritos!",
      icon: "star",
      color: "#10B981",
      path: "/favorites", 
    },
    {
      id: 2,
      title: "Wish-Lists",
      message: "Listas para compartir con tus amigos!",
      icon: "heart",
      color: "#3B82F6",
      path: "/wishlists",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        <Text className="text-3xl font-bold text-gray-900 mb-8">Your Games</Text>

        <View className="gap-3">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => router.push(option.path)}
              className="bg-white rounded-xl p-4 flex-row items-start shadow-sm"
            >
              <View className="mr-4 p-2 bg-gray-50 rounded-lg">
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={option.color}
                />
              </View>
              <View className="flex-1">
                <Text className="text-base text-gray-900 font-semibold mb-1">
                  {option.title}
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                  {option.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}