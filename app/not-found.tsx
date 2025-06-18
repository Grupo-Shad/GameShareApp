import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">
        404 - Página no encontrada
      </Text>
      <Text className="text-lg text-gray-600 mt-4">
        La página que estás buscando no existe.
      </Text>
      <Link href="/" className="text-blue-600 mt-8">
        Volver a la página principal
      </Link>
    </View>
  );
}
