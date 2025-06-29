import axios from "axios";
import { getIdToken } from "firebase/auth";

export interface FeaturedGame {
  _id: string;
  name: string;
  imageUrl?: string;
  score: number;
  description: string;
  genre: string[];
  developerStudio?: string;
  publisher?: string;
  releaseDate?: string;
  availablePlatforms?: string[];
  featured?: boolean;
}

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const getFeaturedGames = async (
  getIdToken: () => Promise<string | null>
): Promise<FeaturedGame[]> => {
  const token = await getIdToken();
  const response = await axios.get(`${API_URL}/games/featured`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getFeaturedGames");
  console.log(response.data);

  return response.data;
};

export const getGameData = async (
  gameId: string,
  getIdToken: () => Promise<string | null>
): Promise<FeaturedGame> => {
  const token = await getIdToken();
  console.log("gameId");
  console.log(gameId);
  const response = await axios.get(`${API_URL}/games/${gameId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getGameData");
  console.log(response.data);

  return response.data;
};
