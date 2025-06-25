export interface FeaturedGame {
  id: string;
  title: string;
  imageUrl: string;
  score: number;
  description: string;
  category: string;
}

// Función mockeada para obtener juegos destacados
export const getFeaturedGames = async (): Promise<FeaturedGame[]> => {
  // Simular delay de red
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
