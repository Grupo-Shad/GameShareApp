import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { toggleFavorite } from '@/utils/api';

interface GameCardProps {
  gameId: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoriteToggle?: (isFavorite: boolean) => void;
}

const GameCard: React.FC<GameCardProps> = ({ 
  gameId,
  imageUrl, 
  title, 
  subtitle, 
  isFavorite = false,
  onPress,
  onFavoriteToggle 
}) => {
  const { user, getIdToken } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  // Sincronizar el estado local cuando cambie el prop isFavorite
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteToggle = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      await toggleFavorite(user.uid, gameId, getIdToken);
      const newFavoriteState = !favorite;
      setFavorite(newFavoriteState);
      onFavoriteToggle?.(newFavoriteState);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'No se pudo actualizar el favorito');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <TouchableOpacity
      className="
        bg-slate-800 
        rounded-xl 
        overflow-hidden 
        shadow-lg 
        m-2
        w-48
      "
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="w-full h-48 relative">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Icono de estrella para favoritos */}
        <TouchableOpacity
          className="absolute top-2 right-2 bg-black/50 rounded-full p-2"
          onPress={handleFavoriteToggle}
          disabled={isProcessing}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            size={20}
            color={favorite ? "#FFD700" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>
      <View className="p-3">
        <Text 
          className="text-white font-bold text-base truncate"
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;