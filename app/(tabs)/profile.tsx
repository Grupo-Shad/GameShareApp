import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

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
      <View className="p-5">
        {/* Header del perfil */}
        <View className="items-center bg-white rounded-2xl p-8 mb-5 shadow-sm">
          <View className="relative mb-4">
            <View className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center">
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
            <TouchableOpacity className="absolute -right-0.5 bottom-0.5 bg-white rounded-full w-7 h-7 items-center justify-center shadow-sm">
              <Ionicons name="camera" size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {user?.displayName || "Usuario"}
          </Text>
          <Text className="text-base text-gray-500 mb-5">
            {user?.email || "usuario@ejemplo.com"}
          </Text>
          <TouchableOpacity className="bg-blue-500 px-6 py-2.5 rounded-full">
            <Text className="text-white text-base font-medium">
              Editar perfil
            </Text>
          </TouchableOpacity>
        </View>

        {/* Estadísticas */}
        <View className="flex-row bg-white rounded-2xl p-5 mb-5 shadow-sm">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-gray-900 mb-1">127</Text>
            <Text className="text-sm text-gray-500">Actividades</Text>
          </View>
          <View className="w-px bg-gray-200 mx-5" />
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-gray-900 mb-1">43</Text>
            <Text className="text-sm text-gray-500">Completadas</Text>
          </View>
          <View className="w-px bg-gray-200 mx-5" />
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-gray-900 mb-1">15</Text>
            <Text className="text-sm text-gray-500">Días activo</Text>
          </View>
        </View>

        {/* Menú de opciones */}
        <View className="mb-5">
          <Text className="text-lg font-semibold text-gray-900 mb-3 ml-1">
            Configuración de cuenta
          </Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-xl p-4 flex-row items-center mb-2 shadow-sm"
            >
              <View
                className="w-10 h-10 rounded-lg items-center justify-center mr-4"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900 mb-0.5">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500">{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Opciones adicionales */}
        <View className="bg-white rounded-xl mb-5 shadow-sm">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
            <Ionicons name="share-outline" size={22} color="#3B82F6" />
            <Text className="text-base text-gray-900 ml-4">
              Compartir aplicación
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
            <Ionicons name="star-outline" size={22} color="#F59E0B" />
            <Text className="text-base text-gray-900 ml-4">
              Calificar aplicación
            </Text>
          </TouchableOpacity>

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
      </View>
    </ScrollView>
  );
}
