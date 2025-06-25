import { View, Text, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeView from "@/components/SafeView";

export default function ExploreScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <SafeView>
        <Text className="text-3xl font-bold text-gray-900 mb-2">Explorar</Text>
        <Text className="text-lg text-gray-500 mb-8">
          Descubre contenido nuevo
        </Text>

        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-8 shadow-sm">
          <Ionicons name="search" size={20} color="#6B7280" className="mr-3" />
          <TextInput
            className="flex-1 text-base text-gray-900"
            placeholder="Buscar..."
            placeholderTextColor="#6B7280"
          />
        </View>

        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Categorías populares
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="bg-white rounded-xl p-5 items-center w-[48%] mb-3 shadow-sm">
              <Ionicons name="trending-up" size={24} color="#3B82F6" />
              <Text className="mt-2 text-sm font-medium text-gray-900">
                Tendencias
              </Text>
            </View>
            <View className="bg-white rounded-xl p-5 items-center w-[48%] mb-3 shadow-sm">
              <Ionicons name="star" size={24} color="#F59E0B" />
              <Text className="mt-2 text-sm font-medium text-gray-900">
                Destacados
              </Text>
            </View>
            <View className="bg-white rounded-xl p-5 items-center w-[48%] mb-3 shadow-sm">
              <Ionicons name="time" size={24} color="#10B981" />
              <Text className="mt-2 text-sm font-medium text-gray-900">
                Recientes
              </Text>
            </View>
            <View className="bg-white rounded-xl p-5 items-center w-[48%] mb-3 shadow-sm">
              <Ionicons name="heart" size={24} color="#EF4444" />
              <Text className="mt-2 text-sm font-medium text-gray-900">
                Favoritos
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Sugerencias para ti
          </Text>
          <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Contenido personalizado
            </Text>
            <Text className="text-base text-gray-600 leading-6">
              Basado en tus intereses y actividad reciente, te sugerimos
              explorar estas opciones.
            </Text>
          </View>
          <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Nuevos en la plataforma
            </Text>
            <Text className="text-base text-gray-600 leading-6">
              Descubre los últimos contenidos agregados a la aplicación.
            </Text>
          </View>
        </View>
      </SafeView>
    </ScrollView>
  );
}
