export interface FeaturedGame {
  id: string;
  title: string;
  imageUrl: string;
  score: number;
  description: string;
  category: string;
}

export const getFeaturedGames = async (): Promise<FeaturedGame[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      title: "The Legend of Zelda: Breath of the Wild",
      imageUrl:
        "https://www.metacritic.com/a/img/catalog/provider/6/3/6-1-844837-13.jpg",
      score: 97,
      description:
        "An open-world adventure that redefines the Zelda series with incredible freedom and exploration.",
      category: "Adventure",
    },
    {
      id: "2",
      title: "God of War",
      imageUrl:
        "https://www.metacritic.com/a/img/catalog/provider/6/3/6-1-905093-13.jpg",
      score: 94,
      description:
        "A stunning Norse mythology adventure featuring Kratos and his son Atreus.",
      category: "Action",
    },
    {
      id: "3",
      title: "Cyberpunk 2077",
      imageUrl:
        "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1749407617.jpg?auto=webp&fit=cover&height=132&width=88",
      score: 86,
      description:
        "A futuristic RPG set in Night City with immersive cyberpunk aesthetics.",
      category: "RPG",
    },
    {
      id: "4",
      title: "Minecraft",
      imageUrl:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-702279-52.jpg",
      score: 93,
      description:
        "The ultimate sandbox game where creativity knows no bounds.",
      category: "Sandbox",
    },
    {
      id: "5",
      title: "Red Dead Redemption 2",
      imageUrl:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-689098-52.jpg",
      score: 97,
      description:
        "An epic tale of outlaws in the American frontier with stunning detail.",
      category: "Adventure",
    },
    {
      id: "6",
      title: "Among Us",
      imageUrl:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-780942-52.jpg?height=100&width=70",
      score: 78,
      description: "A social deduction game that became a global phenomenon.",
      category: "Party",
    },
  ];
};

export const getGameData = async (gameId: string): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const MOCK_GAMES_DATA = {
    "1": {
      id: "1",
      title: "The Legend of Zelda: Breath of the Wild",
      coverImage:
        "https://www.metacritic.com/a/img/catalog/provider/6/3/6-1-844837-13.jpg",
      year: 2017,
      developer: "Nintendo EPD",
      platforms: ["Nintendo Switch", "Wii U"],
      synopsis:
        "An open-world adventure that redefines the Zelda series with incredible freedom and exploration.",
      category: "Adventure",
    },
    "2": {
      id: "2",
      title: "God of War",
      coverImage:
        "https://www.metacritic.com/a/img/catalog/provider/6/3/6-1-905093-13.jpg",
      year: 2018,
      developer: "Santa Monica Studio",
      platforms: ["PlayStation 4", "PC"],
      synopsis:
        "A stunning Norse mythology adventure featuring Kratos and his son Atreus.",
      category: "Action",
    },
    "3": {
      id: "3",
      title: "Cyberpunk 2077",
      coverImage:
        "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1749407617.jpg?auto=webp&fit=cover&height=132&width=88",
      year: 2020,
      developer: "CD Projekt RED",
      platforms: [
        "PC",
        "PlayStation 4",
        "PlayStation 5",
        "Xbox One",
        "Xbox Series X/S",
      ],
      synopsis:
        "A futuristic RPG set in Night City with immersive cyberpunk aesthetics.",
      category: "RPG",
    },
    "4": {
      id: "4",
      title: "Minecraft",
      coverImage:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-702279-52.jpg",
      year: 2011,
      developer: "Mojang Studios",
      platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
      synopsis: "The ultimate sandbox game where creativity knows no bounds.",
      category: "Sandbox",
    },
    "5": {
      id: "5",
      title: "Red Dead Redemption 2",
      coverImage:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-689098-52.jpg",
      year: 2018,
      developer: "Rockstar Games",
      platforms: ["PC", "PlayStation 4", "Xbox One"],
      synopsis:
        "An epic tale of outlaws in the American frontier with stunning detail.",
      category: "Adventure",
    },
    "6": {
      id: "6",
      title: "Among Us",
      coverImage:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-780942-52.jpg?height=100&width=70",
      year: 2018,
      developer: "InnerSloth",
      platforms: ["PC", "Mobile", "Nintendo Switch", "PlayStation", "Xbox"],
      synopsis: "A social deduction game that became a global phenomenon.",
      category: "Party",
    },
  };

  const gameData = MOCK_GAMES_DATA[gameId as keyof typeof MOCK_GAMES_DATA];

  if (!gameData) {
    throw new Error(`Game with ID ${gameId} not found`);
  }

  return gameData;
};
