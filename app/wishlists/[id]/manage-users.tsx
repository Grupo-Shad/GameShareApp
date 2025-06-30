import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeView from "@/components/SafeView";
import { useAuth } from "@/context/AuthContext";
import { searchUsers, shareWishlist, User } from "@/utils/api";

export default function ManageUsersScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getIdToken } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncing, setDebouncing] = useState(false);
  const [inviting, setInviting] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setDebouncing(true);
      const debounceTimer = setTimeout(() => {
        setDebouncing(false);
        searchForUsers();
      }, 500); // 500ms delay

      return () => {
        clearTimeout(debounceTimer);
        setDebouncing(false);
      };
    } else {
      setUsers([]);
      setDebouncing(false);
    }
  }, [searchQuery]);

  const searchForUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchUsers(searchQuery.trim(), getIdToken);

      // Validate API response
      if (!Array.isArray(data)) {
        setUsers([]);
        return;
      }

      if (data.length === 0) {
        setUsers([]);
        return;
      }

      // Map API response to expected format
      const mappedUsers = data.map((user, index) => {
        const mappedUser = {
          ...user,
          _id: user._id || user.id,
          displayName: user.displayName || user.username || user.email,
        };
        return mappedUser;
      });

      setUsers(mappedUsers);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, getIdToken]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleInviteUser = async () => {
    const userId = selectedUser?._id || selectedUser?.id;
    if (!selectedUser || !userId || !id || typeof id !== "string") return;

    setInviting(userId);
    try {
      await shareWishlist(id, userId, getIdToken);
      Alert.alert(
        "¡Usuario invitado!",
        `${selectedUser.displayName} ahora puede ver tu wishlist`,
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "No se pudo invitar al usuario";
      Alert.alert("Error", errorMessage);
    } finally {
      setInviting(null);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Invitar Usuarios",
          headerShown: true,
          headerBackTitle: "Atrás",
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16,
          },
          headerShadowVisible: false,
        }}
      />
      <View className="flex-1 bg-gray-50">
        <SafeView className="flex-1">
          {/* Search Input */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Buscar usuarios
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900"
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
              />
            </View>
            <Text className="text-sm text-gray-500 mt-2">
              Escribe al menos 2 caracteres para buscar
            </Text>
          </View>

          {/* Debouncing indicator */}
          {debouncing && (
            <View className="bg-yellow-50 rounded-xl p-4 mb-4 shadow-sm border border-yellow-200">
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#F59E0B" />
                <Text className="text-yellow-700 ml-2">Esperando...</Text>
              </View>
            </View>
          )}

          {/* Loading indicator */}
          {loading && (
            <View className="bg-blue-50 rounded-xl p-4 mb-4 shadow-sm border border-blue-200">
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text className="text-blue-700 ml-2">Buscando usuarios...</Text>
              </View>
            </View>
          )}

          {/* Users List */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* No results message */}
            {users.length === 0 &&
              searchQuery.trim().length >= 2 &&
              !loading &&
              !debouncing && (
                <View className="bg-white rounded-xl p-8 mb-4 shadow-sm">
                  <Text className="text-gray-500 text-center">
                    No se encontraron usuarios
                  </Text>
                  <Text className="text-gray-400 text-center mt-2">
                    Intenta con otro término de búsqueda
                  </Text>
                </View>
              )}

            {/* Users list */}
            {users.length > 0 && (
              <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <Text className="text-sm text-gray-600 mb-3">
                  {users.length} usuario{users.length !== 1 ? "s" : ""}{" "}
                  encontrado{users.length !== 1 ? "s" : ""}
                </Text>
                {users.map((user, index) => {
                  const userId = user._id || user.id;
                  const userName =
                    user.displayName ||
                    user.username ||
                    user.email ||
                    "Usuario";

                  return (
                    <TouchableOpacity
                      key={userId || `user-${index}-${user.email || index}`}
                      onPress={() => handleSelectUser(user)}
                      className={`flex-row items-center p-3 rounded-lg mb-2 ${
                        selectedUser?._id === userId
                          ? "bg-blue-50 border-2 border-blue-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <View className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <Text className="text-white font-semibold">
                          {userName.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold text-gray-900">
                          {userName}
                        </Text>
                        <Text className="text-sm text-gray-600">
                          {user.email || "Sin email"}
                        </Text>
                      </View>
                      {selectedUser?._id === userId && (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#3B82F6"
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </SafeView>

        {/* Invite Button */}
        {selectedUser && (selectedUser._id || selectedUser.id) && (
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <Text className="text-white font-semibold text-sm">
                  {(
                    selectedUser.displayName ||
                    selectedUser.username ||
                    selectedUser.email ||
                    "?"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </Text>
              </View>
              <Text className="text-gray-900 font-medium">
                Invitar a{" "}
                {selectedUser.displayName ||
                  selectedUser.username ||
                  selectedUser.email ||
                  "Usuario"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleInviteUser}
              disabled={inviting === (selectedUser._id || selectedUser.id)}
              className={`flex-row items-center justify-center py-3 rounded-lg ${
                inviting === (selectedUser._id || selectedUser.id)
                  ? "bg-gray-300"
                  : "bg-green-500"
              }`}
            >
              {inviting === (selectedUser._id || selectedUser.id) ? (
                <>
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Invitando...
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="person-add" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Enviar invitación
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}
