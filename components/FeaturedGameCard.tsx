import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { toggleFavorite } from "@/utils/api";

interface FeaturedGameCardProps {
  gameId: string;
  name: string;
  imageUrl?: string;
  score: number;
  description: string;
  genres?: string[];
  developerStudio?: string;
  publisher?: string;
  releaseDate?: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const FeaturedGameCard: React.FC<FeaturedGameCardProps> = ({
  gameId,
  name,
  imageUrl,
  score,
  description,
  genres = [],
  developerStudio,
  publisher,
  releaseDate,
  isFavorite = false,
  onPress,
  onFavoriteChange,
}) => {
  const { user, getIdToken } = useAuth();
  const [isCurrentlyFavorite, setIsCurrentlyFavorite] = useState(isFavorite);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsCurrentlyFavorite(isFavorite);
  }, [isFavorite]);

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

  const handleFavoritePress = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      await toggleFavorite(user.uid, gameId, getIdToken);
      const newFavoriteState = !isCurrentlyFavorite;
      setIsCurrentlyFavorite(newFavoriteState);
      onFavoriteChange?.(newFavoriteState);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'No se pudo actualizar el favorito');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatReleaseDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-2xl overflow-hidden shadow-lg mb-6 mx-4 bg-white border border-gray-400"
    >
      {/* Image section */}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-96"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-96 bg-gray-300 justify-center items-center">
          <Ionicons name="game-controller-outline" size={64} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">No Image Available</Text>
        </View>
      )}

      {/* Content section */}
      <View className="p-6">
        {/* Category tags */}
        {genres.length > 0 && (
          <View className="flex-row flex-wrap mb-3">
            {genres.map((genre, index) => (
              <Text
                key={index}
                className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mr-2 mb-1"
              >
                {genre}
              </Text>
            ))}
          </View>
        )}

        {/* Title */}
        <Text className="text-gray-900 text-2xl font-bold mb-3 leading-tight">
          {name}
        </Text>

        {/* Developer and Publisher info */}
        {(developerStudio || publisher) && (
          <View className="mb-3">
            {developerStudio && (
              <Text className="text-gray-600 text-sm">
                Developer:{" "}
                <Text className="font-medium">{developerStudio}</Text>
              </Text>
            )}
            {publisher && (
              <Text className="text-gray-600 text-sm">
                Publisher: <Text className="font-medium">{publisher}</Text>
              </Text>
            )}
            {releaseDate && (
              <Text className="text-gray-600 text-sm">
                Released:{" "}
                <Text className="font-medium">
                  {formatReleaseDate(releaseDate)}
                </Text>
              </Text>
            )}
          </View>
        )}

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
            disabled={isProcessing}
            className="p-2 rounded-full"
          >
            <Ionicons
              name={isCurrentlyFavorite ? "star" : "star-outline"}
              size={28}
              color={isCurrentlyFavorite ? "#FFD700" : "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedGameCard;
