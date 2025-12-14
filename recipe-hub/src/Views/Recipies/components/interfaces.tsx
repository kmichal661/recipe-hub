export interface Recipe {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author: Author;
  images: { id: string; imageUrl: string }[];
  ratings: { id: string; rating: number }[];
  tags: { id: string; name: string }[];
  difficulty?: string;
  servings?: number;
  cookingTime?: number;
  shortDescription?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  avgRating?: number;
  fat?: number;
  steps: Step[];
  ingredients: {
    id: string;
    quantity: string;
    ingredient: {
      id: string;
      name: string;
    };
  }[];
}

export interface Step {
  id: string;
  stepNumber: number;
  instruction: string;
}

interface Author {
  userId: string;
  firstName: string;
  lastName: string;
}
