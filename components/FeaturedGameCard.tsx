import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FeaturedGameCardProps {
  title: string;
  imageUrl: string;
  score: number;
  description: string;
  category?: string;
  initialFavorite?: boolean;
  onPress?: () => void;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const FeaturedGameCard: React.FC<FeaturedGameCardProps> = ({
  title,
  imageUrl,
  score,
  description,
  category = "game",
  initialFavorite = false,
  onPress,
  onFavoriteChange,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 75) return "Universal Acclaim";
    if (score >= 60) return "Generally Favorable";
    return "Mixed Reviews";
  };

  const handleFavoritePress = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteChange?.(newFavoriteState);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-2xl overflow-hidden shadow-lg mb-6 mx-4 bg-white border border-gray-400"
    >
      {/* Image section */}
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-96"
        resizeMode="cover"
      />

      {/* Content section */}
      <View className="p-6">
        {/* Category tag */}
        <View className="self-start mb-3">
          <Text className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
            {category}
          </Text>
        </View>

        {/* Title */}
        <Text className="text-gray-900 text-2xl font-bold mb-3 leading-tight">
          {title}
        </Text>

        {/* Score section */}
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-600 text-sm mr-4">METASCORE</Text>
          <View className={`${getScoreColor(score)} px-2 py-1 rounded`}>
            <Text className="text-white font-bold text-lg">{score}</Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-gray-700 text-sm mb-1">
          {getScoreDescription(score)}
        </Text>
        <Text className="text-gray-500 text-xs mb-4">{description}</Text>

        {/* Favorite button section */}
        <View className="flex-row justify-end">
          <TouchableOpacity
            onPress={handleFavoritePress}
            className="p-2 rounded-full"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "#EF4444" : "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedGameCard;
