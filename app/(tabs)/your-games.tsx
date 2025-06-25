import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function YourGamesScreen() {
  const options = [
    {
      id: 1,
      title: "Juegos Favoritos",
      message:
        "Tus juegos favoritos!",
      icon: "star",
      color: "#10B981",
    },
    {
      id: 2,
      title: "Wish-Lists",
      message: "Listas para compartir con tu amigos !",
      icon: "heart",
      color: "#3B82F6",
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-3xl font-bold text-gray-900">
            Your Games
          </Text>
        </View>

        <View className="gap-3">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className={`bg-white rounded-xl p-4 flex-row items-start shadow-sm relative
                  ? "bg-blue-50 border-l-4 border-blue-500"
              `}
            >
              <View className="mr-4 p-2 bg-gray-50 rounded-lg">
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={option.color}
                />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text
                    className={`text-base text-gray-900 flex-1 mr-2 
                       "font-semibold"`}
                  >
                    {option.title}
                  </Text>
                </View>
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
