import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido!
        </Text>
        <Text className="text-lg text-gray-500 mb-8">Pantalla de Inicio</Text>

        <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Resumen del día
          </Text>
          <Text className="text-base text-gray-600 leading-6">
            Aquí puedes ver un resumen de las actividades del día.
          </Text>
        </View>

        <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Accesos rápidos
          </Text>
          <Text className="text-base text-gray-600 leading-6">
            • Ver estadísticas{"\n"}• Configuración{"\n"}• Ayuda y soporte
          </Text>
        </View>

        <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Últimas actualizaciones
          </Text>
          <Text className="text-base text-gray-600 leading-6">
            Mantente al día con las últimas novedades de la aplicación.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
