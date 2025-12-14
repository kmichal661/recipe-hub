import { AppDataSource } from "../data-source";
import { RecipeImage } from "../entity/RecipeImage";

export const imageResolvers = {
  Query: {
    images: async () => {
      const repo = AppDataSource.getRepository(RecipeImage);
      return repo.find({ relations: ["recipe"] });
    },
  },
};
