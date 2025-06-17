import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">
        ¡Hola NativeWind! 🎉
      </Text>
      <Text className="text-lg text-gray-600 mt-4">
        Tailwind CSS funcionando en Expo
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
