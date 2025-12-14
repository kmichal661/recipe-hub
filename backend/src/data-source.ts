import { DataSource } from "typeorm";
import {
  User,
  Role,
  Recipies,
  Category,
  Comment,
  Ingredient,
  Rating,
  RecipeCategory,
  RecipeImage,
  RecipeIngredient,
  RecipeTag,
  RecipeStep,
  Tag,
  Subscriber,
} from "./entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "recipeHub.sqlite",

  synchronize: true,
  logging: true,
  entities: [
    User,
    Role,
    Recipies,
    Subscriber,
    Category,
    Comment,
    Ingredient,
    Rating,
    RecipeCategory,
    RecipeImage,
    RecipeIngredient,
    RecipeTag,
    RecipeStep,
    Tag,
  ],
  subscribers: [],
  migrations: [],
});
