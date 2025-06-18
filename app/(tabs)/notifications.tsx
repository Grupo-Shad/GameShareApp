import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      title: "Bienvenido a la aplicación",
      message:
        "¡Gracias por unirte! Explora todas las funcionalidades disponibles.",
      time: "Hace 2 horas",
      read: false,
      icon: "checkmark-circle",
      color: "#10B981",
    },
    {
      id: 2,
      title: "Nueva actualización disponible",
      message: "Hemos agregado nuevas características que te van a encantar.",
      time: "Ayer",
      read: true,
      icon: "download",
      color: "#3B82F6",
    },
    {
      id: 3,
      title: "Recordatorio",
      message: "No olvides completar tu perfil para una mejor experiencia.",
      time: "Hace 2 días",
      read: true,
      icon: "person",
      color: "#F59E0B",
    },
    {
      id: 4,
      title: "Consejos y trucos",
      message: "Descubre cómo sacar el máximo provecho de la aplicación.",
      time: "Hace 3 días",
      read: true,
      icon: "lightbulb",
      color: "#EF4444",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-3xl font-bold text-gray-900">
            Notificaciones
          </Text>
          <TouchableOpacity className="px-3 py-1.5 rounded-lg bg-blue-500">
            <Text className="text-sm text-white font-medium">
              Marcar todas como leídas
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-3">
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`bg-white rounded-xl p-4 flex-row items-start shadow-sm relative ${
                !notification.read
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <View className="mr-4 p-2 bg-gray-50 rounded-lg">
                <Ionicons
                  name={notification.icon as any}
                  size={24}
                  color={notification.color}
                />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text
                    className={`text-base text-gray-900 flex-1 mr-2 ${
                      !notification.read ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {notification.title}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {notification.time}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 leading-5">
                  {notification.message}
                </Text>
              </View>
              {!notification.read && (
                <View className="w-2 h-2 rounded-full bg-blue-500 absolute top-4 right-4" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {notifications.length === 0 && (
          <View className="items-center py-16">
            <Ionicons name="notifications-off" size={64} color="#6B7280" />
            <Text className="text-xl font-semibold text-gray-900 mt-4 mb-2">
              No hay notificaciones
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6">
              Cuando tengas notificaciones nuevas, aparecerán aquí.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
