import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface GameCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ imageUrl, title, subtitle, onPress }) => {
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
      <View className="w-full h-48">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
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