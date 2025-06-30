import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WishlistCardProps {
  id: string;
  name: string;
  owner: {
    displayName: string;
    email: string;
  };
  gameCount: number;
  sharedCount: number;
  onPress: () => void;
}

export default function WishlistCard({
  id,
  name,
  owner,
  gameCount,
  sharedCount,
  onPress,
}: WishlistCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {name}
          </Text>
          <Text className="text-sm text-gray-600">Por {owner.displayName}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Ionicons name="game-controller" size={16} color="#10B981" />
          <Text className="text-sm text-gray-600 ml-1">{gameCount} juegos</Text>
        </View>

        {sharedCount > 0 && (
          <View className="flex-row items-center">
            <Ionicons name="people" size={16} color="#3B82F6" />
            <Text className="text-sm text-gray-600 ml-1">
              {sharedCount} compartida{sharedCount > 1 ? "s" : ""}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
