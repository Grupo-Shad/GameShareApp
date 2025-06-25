import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";
import SafeView from "@/components/SafeView";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert("Error", "No se pudo cerrar sesión");
          }
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: "person-outline",
      title: "Editar perfil",
      subtitle: "Actualiza tu información personal",
      color: "#3B82F6",
    },
    {
      icon: "notifications-outline",
      title: "Notificaciones",
      subtitle: "Gestiona tus preferencias de notificaciones",
      color: "#F59E0B",
    },
    {
      icon: "shield-outline",
      title: "Privacidad y seguridad",
      subtitle: "Controla tu privacidad y seguridad",
      color: "#10B981",
    },
    {
      icon: "help-circle-outline",
      title: "Ayuda y soporte",
      subtitle: "Obtén ayuda cuando la necesites",
      color: "#8B5CF6",
    },
    {
      icon: "settings-outline",
      title: "Configuración",
      subtitle: "Personaliza tu experiencia",
      color: "#6B7280",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <SafeView>
        {/* Header del perfil */}
        <View className="items-center bg-white rounded-2xl p-8 mb-5 shadow-sm">
          <View className="relative mb-4">
            <View className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center">
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {user?.displayName || "Usuario"}
          </Text>
          <Text className="text-base text-gray-500 mb-5">
            {user?.email || "usuario@ejemplo.com"}
          </Text>
        </View>

        {/* Opciones adicionales */}
        <View className="bg-white rounded-xl mb-5 shadow-sm">
          <TouchableOpacity
            className="flex-row items-center p-4"
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text className="text-base text-red-500 ml-4">Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-sm text-gray-500 mt-5">
          Versión 1.0.0
        </Text>
      </SafeView>
    </ScrollView>
  );
}
