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

  return response.data;
};

export const getGames = async (
  getIdToken: () => Promise<string | null>
): Promise<FeaturedGame[]> => {
  const token = await getIdToken();

  const response = await axios.get(`${API_URL}/games`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const searchGames = async (
  query: string,
  getIdToken: () => Promise<string | null>
): Promise<FeaturedGame[]> => {
  const token = await getIdToken();
  const url = `${API_URL}/games/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getGameData = async (
  gameId: string,
  getIdToken: () => Promise<string | null>
): Promise<FeaturedGame> => {
  const token = await getIdToken();
  const response = await axios.get(`${API_URL}/games/${gameId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export interface WishlistApiResponse {
  id: string;
  title: string;
  description?: string;
  owner: {
    firebaseUid: string;
    username: string;
    avatar?: string;
  };
  games: Array<{
    id: string;
    title: string;
    cover?: string;
    genre: string;
    notes?: string;
    addedAt: string;
  }>;
  sharedWith?: Array<{
    user: {
      firebaseUid: string;
      username: string;
      avatar?: string;
    };
    sharedAt: string;
  }>;
  isOwner?: boolean;
  shareableId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wishlist {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  owner: {
    _id?: string;
    firebaseUid?: string;
    displayName?: string;
    username?: string;
    email?: string;
    avatar?: string;
  };
  games: Array<{
    game: FeaturedGame;
    notes?: string;
    _id: string;
  }>;
  sharedWith?: Array<{
    user: {
      _id: string;
      displayName: string;
      email: string;
    };
    _id: string;
  }>;
  isOwner?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id?: string;
  id?: string;
  displayName?: string;
  username?: string;
  email?: string;
}

const mapWishlistApiResponse = (apiResponse: WishlistApiResponse): Wishlist => {
  return {
    _id: apiResponse.id,
    id: apiResponse.id,
    title: apiResponse.title,
    description: apiResponse.description,
    owner: {
      _id: apiResponse.owner.firebaseUid,
      firebaseUid: apiResponse.owner.firebaseUid,
      displayName: apiResponse.owner.username,
      username: apiResponse.owner.username,
      avatar: apiResponse.owner.avatar,
    },
    games: apiResponse.games.map((game, index) => ({
      _id: game.id,
      game: {
        _id: game.id,
        name: game.title,
        imageUrl: game.cover,
        score: 0,
        description: "",
        genre: [game.genre],
        developerStudio: "",
        publisher: "",
        releaseDate: "",
        availablePlatforms: [],
        featured: false,
      },
      notes: game.notes,
    })),
    sharedWith:
      apiResponse.sharedWith?.map((share, index) => ({
        _id: share.user.firebaseUid,
        user: {
          _id: share.user.firebaseUid,
          displayName: share.user.username,
          email: "",
        },
      })) || [],
    isOwner: apiResponse.isOwner,
    createdAt: apiResponse.createdAt,
    updatedAt: apiResponse.updatedAt,
  };
};

export const createWishlist = async (
  title: string,
  description: string,
  getIdToken: () => Promise<string | null>
): Promise<Wishlist> => {
  const token = await getIdToken();
  const response = await axios.post(
    `${API_URL}/wishlists`,
    { title, description },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getWishlists = async (
  getIdToken: () => Promise<string | null>
): Promise<Wishlist[]> => {
  const token = await getIdToken();
  const response = await axios.get(`${API_URL}/wishlists`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getWishlistById = async (
  wishlistId: string,
  getIdToken: () => Promise<string | null>
): Promise<Wishlist> => {
  const token = await getIdToken();
  const response = await axios.get(`${API_URL}/wishlists/${wishlistId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return mapWishlistApiResponse(response.data);
};

export const shareWishlist = async (
  wishlistId: string,
  userId: string,
  getIdToken: () => Promise<string | null>
): Promise<void> => {
  const token = await getIdToken();
  await axios.post(
    `${API_URL}/wishlists/${wishlistId}/share`,
    { targetUserId: userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const unshareWishlist = async (
  wishlistId: string,
  targetFirebaseUid: string,
  getIdToken: () => Promise<string | null>
): Promise<void> => {
  const token = await getIdToken();
  await axios.delete(
    `${API_URL}/wishlists/${wishlistId}/share/${targetFirebaseUid}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addGameToWishlist = async (
  wishlistId: string,
  gameId: string,
  notes: string | undefined,
  getIdToken: () => Promise<string | null>
): Promise<void> => {
  const token = await getIdToken();
  const body: { gameId: string; notes?: string } = { gameId };
  if (notes) body.notes = notes;

  const response = await axios.post(
    `${API_URL}/wishlists/${wishlistId}/games`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeGameFromWishlist = async (
  wishlistId: string,
  gameId: string,
  userId: string,
  getIdToken: () => Promise<string | null>
): Promise<void> => {
  const token = await getIdToken();
  await axios.delete(`${API_URL}/wishlists/${wishlistId}/games/${gameId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: { userId },
  });
};

export const searchUsers = async (
  query: string,
  getIdToken: () => Promise<string | null>
): Promise<User[]> => {
  const token = await getIdToken();

  try {
    const response = await axios.get(
      `${API_URL}/users/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
